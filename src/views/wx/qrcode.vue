<template>
  <div style="text-align:center">
    <wxlogin
      style="margin-left: 25px"
      :href="wx.href"
      :state="wx.state"
      :appid="wx.appid"
      :scope="wx.scope"
      :redirect_uri="wx.redirect_uri"
    />
  </div>
</template>

<script>
import wxlogin from 'vue-wxlogin'

export default {
  name: 'QRCode',
  components: { wxlogin },
  data() {
    return {
      wx: {
        appid: 'wx31bf2077a1e88b1a',
        scope: 'snsapi_login',
        redirect_uri: encodeURIComponent('http://test6.topbpm.com/VisitBGView/#/wxcallback'),
        state: 'visitBG',
        theme: 'black',
        href: ''
      }
    }
  }
}
</script>
