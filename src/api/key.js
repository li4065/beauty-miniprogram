// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const express = require('express');
const tencentcloud = require("tencentcloud-sdk-nodejs");
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json());

// 鍞囪壊
const FmuClient = tencentcloud.fmu.v20191213.Client;
const clientConfig = {
  credential: {
    secretId: "AKID1sSmpb8PRCgurXy94i5B0YppY1E9oDLC",
    secretKey: "bw2rPggPq0tWsxmKL5YlhMkrhFWXIn1y",
  },
  region: "ap-shanghai",
  profile: {
    httpProfile: {
      endpoint: "fmu.tencentcloudapi.com",
    },
  },
};

const client = new FmuClient(clientConfig);

app.post('/TryLipstickPic', (req, res) => {
  const params = req.body;

  client.TryLipstickPic(params).then(
    (data) => {
      console.log('data', data);
      res.send(data);
    },
    (err) => {
      console.error("error", err);
    }
  );

})

// 浜斿畼瀹氫綅
const IaiClient = tencentcloud.iai.v20200303.Client;
const IaiClientConfig = {
  credential: {
    secretId: "AKID1sSmpb8PRCgurXy94i5B0YppY1E9oDLC",
    secretKey: "bw2rPggPq0tWsxmKL5YlhMkrhFWXIn1y",
  },
  region: "ap-shanghai",
  profile: {
    httpProfile: {
      endpoint: "iai.tencentcloudapi.com",
    },
  },
};

const laiclient = new IaiClient(IaiClientConfig);
// const laiparams = {
//     "Url": "https://image-1300636809.cos.ap-nanjing.myqcloud.com/%E5%85%A5%E8%81%8C2.jpg"
// };

app.post('/DetectFaceAttributes', (req, res) => {
  const laiparams = req.body;

  laiclient.DetectFaceAttributes(laiparams).then(
    (data) => {
      console.log('data0', data);
      res.send(data);
    },
    (err) => {
      console.error("error", err);
    }
  );
})

const UpdateImg = tencentcloud.iai.v20200303.Client;
const UpdateImgConfig = {
  credential: {
    secretId: "AKID1sSmpb8PRCgurXy94i5B0YppY1E9oDLC",
    secretKey: "bw2rPggPq0tWsxmKL5YlhMkrhFWXIn1y",
  },
  region: "ap-shanghai",
  profile: {
    // signMethod: "HmacSHA256", // 签名方法
    httpProfile: {
      httpProfile: {
        endpoint: "trtc.tencentcloudapi.com",
      },
    },
  },
};
const UpdateImgclient = new IaiClient(UpdateImgConfig);
app.post('/CreatePicture', (req, res) => {
  const imgParams = req.body;

  UpdateImgclient.CreatePicture(imgParams).then(
    (data) => {
      console.log('data0', data);
      res.send(data);
    },
    (err) => {
      console.error("error", err);
    }
  );
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})