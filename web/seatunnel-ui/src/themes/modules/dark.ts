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
import type { GlobalThemeOverrides } from '../type'


const dark = {
  common: {
    bodyColor: '#121619',
    // baseColor: '#f8f8fc',

    /**************** Brand color */
    primaryColor: '#c1c7cd',
    primaryColorHover: '#ffffff',
    primaryColorPressed: '#3c9ae8',
    primaryColorSuppl: '#177ddc',

    /**************** Function of color */
    infoColor: '#177ddc',
    // successColor: '#49aa19',
    // warningColor: '#d89614',
    // errorColor: '#a61d24'
  },
  Layout: {
    headerColor: '#121619',
    siderColor: '#121619',
    bodyColor: '#121619'
  },
  Menu: {
    itemTextColorHorizontal: '#c1c7cd',
    itemTextColor: '#c1c7cd',
    itemIconColor: '#c1c7cd',
    itemIconColorCollapsed: '#dbdbdb'
  },
  Dropdown: {
    borderRadius: '0px',
    color:'#f4f4f4',
    optionColorActive: 'black'
  },

  
  // Layout: {
  //   headerColor: '#141414'
  // },
  // DataTable: {
  //   thTextColor: '#fff',
  //   tdColorHover: '#f2f2fa'
  // },
  // Space: {
  //   gapLarge: '28px 32px'
  // }
} as GlobalThemeOverrides

export default dark
