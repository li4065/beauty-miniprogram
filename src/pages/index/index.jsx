import { Component } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
// import tencentcloud from 'tencentcloud-sdk-nodejs';
// import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'

export default class Index extends Component {

  state = {
    tempFilePaths: '',
  }

  componentWillMount() { }

  async componentDidMount() {
    const res = await Taro.request({
      url: 'http://localhost:3000/DetectFaceAttributes',
      data: {
        "Url": "https://image-1300636809.cos.ap-nanjing.myqcloud.com/%E5%85%A5%E8%81%8C2.jpg"
      },
      method: 'POST',
    });
    const { FaceDetailInfos } = res.data;
    const { FaceRect } = FaceDetailInfos[0]; // 获取面容尺寸
    const imgSrc = await Taro.request({
      url: 'http://localhost:3000/TryLipstickPic',
      data: {
        Url: 'https://image-1300636809.cos.ap-nanjing.myqcloud.com/%E5%85%A5%E8%81%8C2.jpg',
        LipColorInfos: [{"RGBA":{"R":255,"G":220,"B":0,"A":50}, FaceRect }],
        RspImgType: 'url'
      },
      method: 'POST',
    });
    console.log('处理后的图片', imgSrc);
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
          mode='widthFix'
          src={tempFilePaths}
        />
      </View>
    )
  }
}
