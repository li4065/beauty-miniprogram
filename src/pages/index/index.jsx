import { Component } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
const crypto = require('crypto');
// import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'

export default class Index extends Component {

  state = {
    tempFilePaths: '',
    color: ''
  }

  componentWillMount() { }

  componentDidMount() {
    // function sha1(secretKey, strsign) {
    //   let signMethodMap = { 'HmacSHA1': "sha1" };
    //   let hmac = crypto.createHmac(signMethodMap['HmacSHA1'], secretKey || "");
    //   return hmac.update(Buffer.from(strsign, 'utf8')).digest('base64')
    // }
    // function formatSignString(reqMethod, endpoint, path, strParam) {
    //   let strSign = reqMethod + endpoint + path + "?" + strParam.slice(1);
    //   return strSign;
    // }
    // function sort_params(params) {
    //   let strParam = "";
    //   let keys = Object.keys(params);
    //   keys.sort();
    //   for (let k in keys) {
    //     //k = k.replace(/_/g, '.');
    //     strParam += ("&" + keys[k] + "=" + params[keys[k]]);
    //   }
    //   return strParam
    // }
    // const params = {};
    // const SecretKey = '3qMbZGfneGbeQwA7nCKBl47sMZVAXdRy';
    // const date = new Date();
    // const Timestamp = date.getTime();
    // const Version = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    // params['Action'] = 'GetModelList';
    // params['InstanceIds.0'] = 'ins-09dx96dg';
    // params['Limit'] = 20;
    // params['Offset'] = 0;
    // params['Nonce'] = 20;
    // params['Region'] = 'ap-shanghai';
    // params['SecretId'] = 'AKIDObYEemeLlulMgiT3NPAftqWv5yavznJY';
    // params['Timestamp'] = Timestamp;
    // params['Version'] = '2019-12-13';
    // const strParam = sort_params(params)
    // const strSign = formatSignString("GET", "fmu.tencentcloudapi.co", '/', strParam)
    // const Signature = sha1(SecretKey, strSign)
    // Taro.request({
    //   url: 'https://fmu.tencentcloudapi.com', //仅为示例，并非真实的接口地址
    //   data: {
    //     Action: 'GetModelList',
    //     Version: '2019-12-13',
    //     Region: 'ap-shanghai',
    //     Timestamp: Timestamp,
    //     Nonce: 20,
    //     SecretId: 'AKIDObYEemeLlulMgiT3NPAftqWv5yavznJY',
    //     Signature,
    //     // SecretKey: '3qMbZGfneGbeQwA7nCKBl47sMZVAXdRy'
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //   }
    // })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  uploadImg = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0];
        this.setState({ tempFilePaths });
        console.log(tempFilePaths, 'tempFilePaths-tempFilePaths');
      }
    })
  }

  render() {
    const { tempFilePaths } = this.state;
    const colorList = ['#750000', '	#930000', '#AE0000', '#CE0000', '#EA0000', '#FF0000', '#D9006C', '#F00078', '#FF0080', '#D200D2', '#E800E8', '#D94600', '#F75000']
    return (
      <View className='index'>
        <Button onClick={this.uploadImg}>上传照片</Button>
        <Image
          className='image'
          src={tempFilePaths}
        />
        <View style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {colorList.map((colorItem, index) => (
            <Text onClick={() => { this.setState({ color: colorItem }) }} key={index.toString()} style={{ display: 'inline-block', width: 20, height: 20, backgroundColor: colorItem, borderRadius: '50%', marginRight: 10, marginTop: 10 }}></Text>
          ))}
        </View>
      </View>
    )
  }
}
