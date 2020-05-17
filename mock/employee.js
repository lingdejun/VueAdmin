/* eslint-disable no-unused-vars */
import Mock from 'mockjs'

const List = []
const count = 100

// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src='https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943'></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    PageIndex: 1,
    PageSize: 10,
    TotalReadCount: 11,
    TotalPageCount: 2,
    Items: [{
      Id: 2,
      Number: '1',
      Name: '张三2',
      Email: null,
      Vip: 0,
      Gate: '漕泾工厂区行政楼'
    },
    {
      Id: 4,
      Number: '1',
      Name: '张三4',
      Email: null,
      Vip: 0,
      Gate: '远东国际大厦30楼,漕泾工厂区培训楼,漕泾工厂区3号门岗,漕泾工厂区7号门岗'
    }, {
      Id: 6,
      Number: '1',
      Name: '张三6',
      Email: null,
      Vip: 0,
      Gate: '漕泾工厂区3号门岗'
    }, {
      Id: 8,
      Number: '1',
      Name: '张三8',
      Email: null,
      Vip: 0,
      Gate: '远东国际大厦30楼,漕泾工厂区7号门岗'
    }, {
      Id: 10,
      Number: '1',
      Name: '张三10',
      Email: null,
      Vip: 0,
      Gate: '远东国际大厦30楼,漕泾工厂区培训楼'
    }, {
      Id: 12,
      Number: '1',
      Name: '张三12',
      Email: null,
      Vip: 0,
      Gate: '远东国际大厦31楼,漕泾工厂区行政楼'
    }, {
      Id: 14,
      Number: '1',
      Name: '张三14',
      Email: null,
      Vip: 0,
      Gate: '漕泾工厂区行政楼,漕泾工厂区3号门岗'
    }, {
      Id: 16,
      Number: '1',
      Name: '张三16',
      Email: null,
      Vip: 0,
      Gate: '远东国际大厦30楼,漕泾工厂区培训楼'
    }, {
      Id: 18,
      Number: '1',
      Name: '张三18',
      Email: null,
      Vip: 0,
      Gate: '漕泾工厂区行政楼,漕泾工厂区3号门岗'
    }, {
      Id: 20,
      Number: '1',
      Name: '张三20',
      Email: null,
      Vip: 0,
      Gate: null
    }]
  }))
}

export default [
  {
    url: '/vue-element-admin/employee/list',
    type: 'get',
    response: config => {
      const { name, pageindex = 1, pagesize = 20, sort } = config.query
      console.log('pageindex=' + pageindex)
      let mockList = List.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < pagesize * pageindex && index >= pagesize * (pageindex - 1))

      return {
        code: 20000,
        data: {
          PageIndex: parseInt(pageindex),
          PageSize: 10,
          TotalReadCount: 11,
          TotalPageCount: 2,
          Items: [{
            Id: 2,
            Number: '1',
            Name: '张三2',
            Email: null,
            Vip: 0,
            Gate: '漕泾工厂区行政楼'
          },
          {
            Id: 4,
            Number: '1',
            Name: '张三4',
            Email: null,
            Vip: 0,
            Gate: '远东国际大厦30楼,漕泾工厂区培训楼,漕泾工厂区3号门岗,漕泾工厂区7号门岗'
          }, {
            Id: 6,
            Number: '1',
            Name: '张三6',
            Email: null,
            Vip: 0,
            Gate: '漕泾工厂区3号门岗'
          }, {
            Id: 8,
            Number: '1',
            Name: '张三8',
            Email: null,
            Vip: 0,
            Gate: '远东国际大厦30楼,漕泾工厂区7号门岗'
          }, {
            Id: 10,
            Number: '1',
            Name: '张三10',
            Email: null,
            Vip: 0,
            Gate: '远东国际大厦30楼,漕泾工厂区培训楼'
          }, {
            Id: 12,
            Number: '1',
            Name: '张三12',
            Email: null,
            Vip: 0,
            Gate: '远东国际大厦31楼,漕泾工厂区行政楼'
          }, {
            Id: 14,
            Number: '1',
            Name: '张三14',
            Email: null,
            Vip: 0,
            Gate: '漕泾工厂区行政楼,漕泾工厂区3号门岗'
          }, {
            Id: 16,
            Number: '1',
            Name: '张三16',
            Email: null,
            Vip: 0,
            Gate: '远东国际大厦30楼,漕泾工厂区培训楼'
          }, {
            Id: 18,
            Number: '1',
            Name: '张三18',
            Email: null,
            Vip: 0,
            Gate: '漕泾工厂区行政楼,漕泾工厂区3号门岗'
          }, {
            Id: 20,
            Number: '1',
            Name: '张三20',
            Email: null,
            Vip: 0,
            Gate: null
          }]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/employee/create',
    type: 'post',
    response: config => {
      const { id } = config.query
      return {
        code: 20000,
        data: List[0].Items
      }
    }
  },

  {
    url: '/vue-element-admin/employee/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: List[0].Items
      }
    }
  },

  {
    url: '/vue-element-admin/employee/delete',
    type: 'post',
    response: _ => {
      return {
        code: 20000
      }
    }
  }
]

