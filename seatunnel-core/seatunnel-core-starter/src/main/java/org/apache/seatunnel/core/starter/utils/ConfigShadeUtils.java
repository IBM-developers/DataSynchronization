/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.seatunnel.core.starter.utils;

import org.apache.seatunnel.shade.com.google.common.base.Preconditions;
import org.apache.seatunnel.shade.com.typesafe.config.Config;
import org.apache.seatunnel.shade.com.typesafe.config.ConfigFactory;
import org.apache.seatunnel.shade.com.typesafe.config.ConfigRenderOptions;

import org.apache.seatunnel.api.configuration.ConfigShade;
import org.apache.seatunnel.common.Constants;
import org.apache.seatunnel.common.config.TypesafeConfigUtils;
import org.apache.seatunnel.common.constants.CollectionConstants;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.ServiceLoader;
import java.util.function.BiFunction;

/** Config shade utilities */
@Slf4j
public final class ConfigShadeUtils {

    private static final String SHADE_IDENTIFIER_OPTION = "shade.identifier";

    private static final String[] DEFAULT_SENSITIVE_OPTIONS =
            new String[] {"password", "username", "auth"};

    private static final Map<String, ConfigShade> CONFIG_SHADES = new HashMap<>();

    private static final ConfigShade DEFAULT_SHADE = new DefaultConfigShade();

    static {
        ServiceLoader<ConfigShade> serviceLoader = ServiceLoader.load(ConfigShade.class);
        Iterator<ConfigShade> it = serviceLoader.iterator();
        it.forEachRemaining(
                configShade -> {
                    CONFIG_SHADES.put(configShade.getIdentifier(), configShade);
                });
        log.info("Load config shade spi: {}", CONFIG_SHADES.keySet());
    }

    private static class DefaultConfigShade implements ConfigShade {
        private static final String IDENTIFIER = "default";

        @Override
        public String getIdentifier() {
            return IDENTIFIER;
        }

        @Override
        public String encrypt(String content) {
            return content;
        }

        @Override
        public String decrypt(String content) {
            return content;
        }
    }

    public static String encryptOption(String identifier, String content) {
        ConfigShade configShade = CONFIG_SHADES.getOrDefault(identifier, DEFAULT_SHADE);
        return configShade.encrypt(content);
    }

    public static String decryptOption(String identifier, String content) {
        ConfigShade configShade = CONFIG_SHADES.getOrDefault(identifier, DEFAULT_SHADE);
        return configShade.decrypt(content);
    }

    public static Config decryptConfig(Config config) {
        String identifier =
                TypesafeConfigUtils.getConfig(
                        config.hasPath(Constants.ENV)
                                ? config.getConfig(Constants.ENV)
                                : ConfigFactory.empty(),
                        SHADE_IDENTIFIER_OPTION,
                        DEFAULT_SHADE.getIdentifier());
        return decryptConfig(identifier, config);
    }

    public static Config encryptConfig(Config config) {
        String identifier =
                TypesafeConfigUtils.getConfig(
                        config.hasPath(Constants.ENV)
                                ? config.getConfig(Constants.ENV)
                                : ConfigFactory.empty(),
                        SHADE_IDENTIFIER_OPTION,
                        DEFAULT_SHADE.getIdentifier());
        return encryptConfig(identifier, config);
    }

    public static Config decryptConfig(String identifier, Config config) {
        return processConfig(identifier, config, true);
    }

    public static Config encryptConfig(String identifier, Config config) {
        return processConfig(identifier, config, false);
    }

    @SuppressWarnings("unchecked")
    private static Config processConfig(String identifier, Config config, boolean isDecrypted) {
        ConfigShade configShade = CONFIG_SHADES.getOrDefault(identifier, DEFAULT_SHADE);
        List<String> sensitiveOptions = new ArrayList<>(Arrays.asList(DEFAULT_SENSITIVE_OPTIONS));
        sensitiveOptions.addAll(Arrays.asList(configShade.sensitiveOptions()));
        BiFunction<String, Object, String> processFunction =
                (key, value) -> {
                    if (isDecrypted) {
                        return configShade.decrypt(value.toString());
                    } else {
                        return configShade.encrypt(value.toString());
                    }
                };

        Map<String, Object> configMap = getConfigMap(config);

        Object sourceObject = configMap.get(Constants.SOURCE);
        List<Map<String, Object>> sources;

        if (sourceObject instanceof List) {
            sources = (List<Map<String, Object>>) sourceObject;
        } else if (sourceObject instanceof Map) {
            sources = new ArrayList<>();
            sources.add((Map<String, Object>) sourceObject);
        } else {
            throw new IllegalArgumentException(
                    "Expected List or Map but got: " + sourceObject.getClass().getName());
        }

        Object sinkObject = configMap.get(Constants.SINK);
        List<Map<String, Object>> sinks;

        if (sinkObject instanceof List) {
            sinks = (List<Map<String, Object>>) sinkObject;
        } else if (sinkObject instanceof Map) {
            sinks = new ArrayList<>();
            sinks.add((Map<String, Object>) sinkObject);
        } else {
            throw new IllegalArgumentException(
                    "Expected List or Map but got: " + sinkObject.getClass().getName());
        }

        Preconditions.checkArgument(
                !sources.isEmpty(), "Miss <Source> config! Please check the config file.");
        Preconditions.checkArgument(
                !sinks.isEmpty(), "Miss <Sink> config! Please check the config file.");
        sources.forEach(
                source -> {
                    for (String sensitiveOption : sensitiveOptions) {
                        source.computeIfPresent(sensitiveOption, processFunction);
                    }
                });
        sinks.forEach(
                sink -> {
                    for (String sensitiveOption : sensitiveOptions) {
                        sink.computeIfPresent(sensitiveOption, processFunction);
                    }
                });
        configMap.put(Constants.SOURCE, sources);
        configMap.put(Constants.SINK, sinks);
        return ConfigFactory.parseMap(configMap);
    }

    public static class Base64ConfigShade implements ConfigShade {

        private static final Base64.Encoder ENCODER = Base64.getEncoder();

        private static final Base64.Decoder DECODER = Base64.getDecoder();

        private static final String IDENTIFIER = "base64";

        @Override
        public String getIdentifier() {
            return IDENTIFIER;
        }

        @Override
        public String encrypt(String content) {
            return ENCODER.encodeToString(content.getBytes(StandardCharsets.UTF_8));
        }

        @Override
        public String decrypt(String content) {
            return new String(DECODER.decode(content));
        }
    }

    private static Map<String, Object> getConfigMap(Config config) {
        ObjectMapper mapper = new ObjectMapper();
        String jsonString = config.root().render(ConfigRenderOptions.concise());

        ObjectNode jsonNodes = jsonStrToObjNode(jsonString);
        JsonNode sourceSubNode = jsonNodes.get(Constants.SOURCE);

        String sourcePlugin = null;
        String sinkPlugin = null;
        if (Objects.nonNull(sourceSubNode) && !(sourceSubNode instanceof ArrayNode)) {
            Iterator<String> fieldNames = sourceSubNode.fieldNames();
            sourcePlugin = fieldNames.next();

            ObjectNode sourceNode = (ObjectNode) jsonNodes.get(Constants.SOURCE).get(sourcePlugin);
            sourceNode.put(CollectionConstants.PLUGIN_NAME, sourcePlugin);
            jsonNodes.set(Constants.SOURCE, sourceNode);
        }

        JsonNode sinkSubNode = jsonNodes.get(Constants.SINK);
        if (Objects.nonNull(sinkSubNode) && !(sinkSubNode instanceof ArrayNode)) {
            Iterator<String> fieldNames = sinkSubNode.fieldNames();
            sinkPlugin = fieldNames.next();

            ObjectNode sinkNode = (ObjectNode) jsonNodes.get(Constants.SINK).get(sinkPlugin);
            sinkNode.put(CollectionConstants.PLUGIN_NAME, sinkPlugin);
            jsonNodes.set(Constants.SINK, sinkNode);
        }

        Map<String, Object> configMap = mapper.convertValue(jsonNodes, Map.class);
        return configMap;
    }

    private static ObjectNode jsonStrToObjNode(String jsonString) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            ObjectNode objectNode = (ObjectNode) mapper.readTree(jsonString);
            mapper.writerWithDefaultPrettyPrinter().writeValueAsString(objectNode);
            return objectNode;
        } catch (Exception e) {
            log.info("Getting exception in jsonStrToObjNode:: {}", e.getMessage());
        }
        return null;
    }
}
