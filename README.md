# README
![](https://github.com/chick-p/sesame-for-fitbit-versa/workflows/fitbit-app-build/badge.svg)

This sesame-app is an application for fitbit versa that to lock and unlock your door with Sesame, smart-lock device.
Please open Fitbit Application on iPhone, set this app configuration.

## Fitbit Versa screenshots
![](images/versa-prepare.png) ![](images/versa-locked.png) ![](images/versa-unlocking.png) ![](images/versa-unlocked.png) 

## Usage
This app is not published to the app store.
You will need to deploy by using Fitbit Studio or the CLI tools, and need to replace Sesame token and Device ID.

## How to replace your Sesame auth token and a device ID
1. Create Sesame auth token, please see [this page](https://docs.candyhouse.co/#authentication).
2. Enable cloud integration for your Sesame Application on smartphone(Status > Change Settings > Integration).
  Please see [this page](https://docs.candyhouse.co/#before-you-start). 
3. Get a sesame device ID using "Get sesame list" API. Please see [API spec](https://docs.candyhouse.co/#get-sesame-list).
4. Open `./companion/sesame.ts`
5. Replace following parameters: 
   * `{YOUR-SESAME-AUTH-TOKEN}`: Sesame auth token
   * `{YOUR-SESAME-DEVICE-ID}`: Sesame device ID

## How to deploy
You need the Fitbit CLI tools:[Command Line Interface Guide](https://dev.fitbit.com/build/guides/command-line-interface/).

1. Run the following command for install libraries
    ```shell
    $ git clone https://github.com/chick-p/sesame-for-fitbit-versa.git
    $ cd sesame-for-fitbit-versa
    $ npm install
    ```

2. Turn on [Developer Bridge] within the Fitbit mobile app (Your device > Developer Menu), and your device (Settings > Developer Bridge).

3. Launch the Fitbit CLI and login your develper account
    ```shell
    $ npx fitbit
    ```

4. Connect your mobile and device, and delopy this application
    ```shell
    fitbit$ connect phone
    fitbit$ connect device
    fitbit$ bi
    ```

## Licence
The MIT License.

Copyright (c) 2019 chick-p

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
