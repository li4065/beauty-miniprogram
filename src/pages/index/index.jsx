import { Component } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
// import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'

export default class Index extends Component {

  state = {
    tempFilePaths: '',
  }

  componentWillMount() { }

  componentDidMount() {
    Taro.request({
      url: 'https://fmu.tencentcloudapi.com/?Action=GetModelList', //仅为示例，并非真实的接口地址
      data: {
        Action: 'GetModelList',
        Version: '2019-12-13',
        Region: 'ap-shanghai',
        Timestamp: 1529223702,
        Nonce: 20,
        SecretId: 'AKIDObYEemeLlulMgiT3NPAftqWv5yavznJY',
        // SecretKey: '3qMbZGfneGbeQwA7nCKBl47sMZVAXdRy'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
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
    return (
      <View className='index'>
        <Button onClick={this.uploadImg}>上传照片</Button>
        <Image
          className='image'
          src={tempFilePaths}
        />
      </View>
    )
  }
}
