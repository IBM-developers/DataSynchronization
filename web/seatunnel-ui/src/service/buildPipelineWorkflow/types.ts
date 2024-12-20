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

export type DatasourceConfig = { [key: string]: any }

export interface DataSourceDetail {
  datasourceName: string
  pluginName: string
  description?: string
  datasourceConfig?: string
}

export interface DatasourceListParameters {
  searchVal: string
  pageNo: number
  pageSize: number
  pluginName?: string
}

export interface DatasourceTestConnectParameters {
  pluginName: string
  datasourceConfig?: string
}


export interface DatasourceTypeList {
  name: string
  icon: string
  version: string
  type: number
  supportVirtualTables: boolean
}
export interface DatasourceRecord {
  id: string
  datasourceName: string
  pluginName: string
  pluginVersion: string
  description: string
  createUserName: string
  createTime: number
  updateTime: number
}

export interface buildPipelineWorkflowList {
  createUserName: string
  createTime: string
  updateUserName: string
  updateTime: string
  id: string
  datasourceName: string
  pluginName: string
  pluginVersion: string
  description: string
  datasourceConfig: DatasourceConfig
  createUserId: number
  updateUserId: number
}
