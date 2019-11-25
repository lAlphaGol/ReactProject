import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Map,Marker,Markers,Text} from 'react-amap';
import AMap from 'react-amap';


function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}


var _React = React;
var Component = _React.Component;
var _ReactDOM = ReactDOM;
var render = _ReactDOM.render;
var zoomvalue = 1000;
var mylogitude=null;
var mylatitude=null;
var myarr=[];
//Map的批量点显示
class Getdata0 extends React.Component{
    constructor(props){//构造函数
        super(props)
        this.state={
            mydatas:[
                {
                    No:null,
                    TypeID:null,
                    ObjectID:null,
                    Name:null,
                    Longitude:null,
                    Latitude:null,
                    CreateTime:null,
                    Location:null,
                    Remark:null,
                    Modify_Record:null,
            }],
            mysigns:[
                {
                    longitude:null,
                    latitude:null
                }
            ]
        }
    }
    componentDidMount(){
        this.fetchData();
        console.log(this.state);
    }
    fetchData=()=>{
        //https://cricketsbrother.github.io/new.json
        //https://cricketsbrother.github.io/fk.json
        fetch('http://2738y998r4.wicp.vip:10557/TrafficSign_API/SignBase',{method:"GET"})
        .then(response=>{return response.json()})
        .then(
            (res)=>{
                
                var myarr=[];
               for(let arr of res)
               {
                   myarr.push(<Marker position={[arr.longitude,arr.latitude]}/>)
               }
               
                this.setState({
                   mydatas:res,
                   mysigns:myarr
                })
            }
        ).catch(err=>{console.log('errroesaa!')})
            
    }
    render()
    {
        const{mydatas,mysigns}=this.state;
        return(
            <Map 
                amapkey ={'1bb9ee64ab614ea1523647c2df308ab0'}
                zoom= {zoomvalue}//原始地图缩放
                //zoomEnable={false}//不支持手动缩放
                center={[103.984111056,30.76196695635]}//设置初始中心坐标
                >
            
            {mydatas.map(mydata=>(<Marker position={[mydata.Longitude,mydata.Latitude]}/>))}

            </Map>
        )
    }
}
//添加点
class Addvalue extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            value: 'straight',
            No:null,
            TypeID:null,
            ObjectID:null,
            Name:null,
            Longitude:null,
            Latitude:null,
            CreateTime:null,
            Location:null,
            Remark:null,
            Modify_Record:null,
        };
   
      this.handleChange = this.handleChange.bind(this);
      this.handleChange1 = this.handleChange1.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);
      this.handleChange3 = this.handleChange3.bind(this);
      this.handleChange4 = this.handleChange4.bind(this);
      this.handleChange5 = this.handleChange5.bind(this);
      this.handleChange6 = this.handleChange6.bind(this);
      this.handleChange7 = this.handleChange7.bind(this);
      this.handleChange8 = this.handleChange8.bind(this);
      this.handleChange9 = this.handleChange9.bind(this);
      this.handleChange10 = this.handleChange10.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      //this.handleChangeButton = this.handleChangeButton.bind(this);
    }
   
    handleChange(event) {
      this.setState({value: event.target.value});
    }
    handleChange1(event) {
        this.setState({No: event.target.value});
    }
    handleChange2(event) {
        this.setState({TypeID: event.target.value});
      }
      handleChange3(event) {
          this.setState({ObjectID: event.target.value});
      }
      handleChange4(event) {
        this.setState({Name: event.target.value});
      }
      handleChange5(event) {
          this.setState({Longitude: event.target.value});
      }
      handleChange6(event) {
        this.setState({Latitude: event.target.value});
      }
      handleChange7(event) {
          this.setState({CreateTime: event.target.value});
      }
      handleChange8(event) {
        this.setState({Location: event.target.value});
      }
      handleChange9(event) {
          this.setState({Remark: event.target.value});
      }
      handleChange10(event) {
        this.setState({Modify_Record: event.target.value});
      }
    handleSubmit(event) {
        //this.setState.CreateTime=new Date();
        //this.setState.Modify_Record=new Date();
      console.log('You have upload the information:\n ' + 
      'value: '+this.state.value+
      '\nNo: '+this.state.No+
      '\nTypeID: '+this.state.TypeID+
      '\nObjectID: '+this.state.ObjectID+
      '\nName: '+this.state.Name+
      '\nLongitude: '+this.state.Longitude+
      '\nLatitude: '+this.state.Latitude+
      '\nCreateTime: '+this.state.CreateTime+
      '\nLocation: '+this.state.Location+
      '\nRemark: '+this.state.Remark+
      '\nModify_Record: '+this.state.Modify_Record
      );
      this.postData();
    }
    /*
    handleChangeButton(event)
    {
        this.setState({
            No:null,
            TypeID:null,
            ObjectID:null,
            Name:null,
            Longitude:null,
            Latitude:null,
            CreateTime:null,
            Location:null,
            Remark:null,
            Modify_Record:null,
        });
    }*/
    /*
    componentDidMount(){
        this.postData();
        console.log(this.state);
    }
    
    fetchData=()=>{
        let url = ".................................";//接口地址
        let formData = new FormData();
        formData.append('c','login');
        formData.append('username', this.state.userName);
        formData.append('password', this.state.passWord);
        formData.append('client', 'android');
        fetch(url,{
            method: 'post',
            body: formData,
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            if (json.code === "200") {
                console.log("232323233-----正确")
            }else if (json.code === "400") {
                console.log("2323232323------错了～")
            }
        })
            
    }*/
    
    postData = ()=> {
        //
        let url = "http://2738y998r4.wicp.vip:10557/TrafficSign_API/SignBase";//接口地址
        fetch(url, 
        {
		   method: "POST",
		   mode: "cors",
           headers: 
           {
		    	"Content-Type": "application/x-www-form-urlencoded"
		   },
           body:'value='+this.state.value+
           '&No='+this.state.No+
           '&TypeID='+this.state.TypeID+
           '&ObjectID='+this.state.ObjectID+
           '&Name='+this.state.Name+
           '&Longitude='+this.state.Longitude+
           '&Latitude='+this.state.Latitude+
           '&CreateTime='+this.state.CreateTime+
           '&Location='+this.state.Location+
           '&Remark='+this.state.Remark+
           '&Modify_Record='+this.state.Modify_Record
	  }).then(response=>response.json())
	    .catch((error)=> {
	          console.error(error);
	    });
    alert('You have uploaded the information:\n ' + 
      'value: '+this.state.value+
      '\nNo: '+this.state.No+
      '\nTypeID: '+this.state.TypeID+
      '\nObjectID: '+this.state.ObjectID+
      '\nName: '+this.state.Name+
      '\nLongitude: '+this.state.Longitude+
      '\nLatitude: '+this.state.Latitude+
      '\nCreateTime: '+this.state.CreateTime+
      '\nLocation: '+this.state.Location+
      '\nRemark: '+this.state.Remark+
      '\nModify_Record: '+this.state.Modify_Record
      );
	}

    render() {
      return (
          <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            选择您需要添加的标志类型
            <br />
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="tl">左转</option>
              <option value="tr">右转</option>
              <option value="straight">直行</option>
            </select>
            <br />
            <br />
            No:<input type="text" value={this.state.No} onChange={this.handleChange1} /> 
            <br />
            <br />
            TypeID:<input type="text" value={this.state.TypeID} onChange={this.handleChange2} /> 
            <br />
            <br />
            ObjectID:<input type="text" value={this.state.ObjectID} onChange={this.handleChange3} /> 
            <br />
            <br />
            Name:<input type="text" value={this.state.Name} onChange={this.handleChange4} /> 
            <br />
            <br />
            Longitude:<input type="text" value={this.state.Longitude} onChange={this.handleChange5} /> 
            <br />
            <br />
            Latitude:<input type="text" value={this.state.Latitude} onChange={this.handleChange6} /> 
            <br />
            <br />
            CreateTime:<input type="text" value={this.state.CreateTime} onChange={this.handleChange7} /> 
            <br />
            <br />
            Location:<input type="text" value={this.state.Location} onChange={this.handleChange8} /> 
            <br />
            <br />
            Remark:<input type="text" value={this.state.Remark} onChange={this.handleChange9} /> 
            <br />
            <br />
            Modify_Record:<input type="text" value={this.state.Modify_Record} onChange={this.handleChange10} /> 
            <br />
            <br />
          </label>
          <input type="submit" value="确定增加" />
        </form>
        </div>
      );
    }
  }

//上传删除点坐标
class Deletevalue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ObjectID:null,
        };
        //this.handleChangeButton = this.handleChangeButton.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeInput1=this.handleChangeInput1.bind(this);
    }
    handleChangeInput1(event){
        this.setState({ObjectID: event.target.value});
      }
      handleSubmit(event) {
      this.setState({value:null});
      this.postData();
      console.log(this.state);
    }
    /*
    fetchData=()=>{
        let url = ".......";//接口地址
        let formData = new FormData();
        formData.append('id', this.state.value);

        fetch(url,{
            method: 'post',
            body: formData,
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            if (json.code === "200") {
                console.log("232323233-----正确")
            }else if (json.code === "400") {
                console.log("2323232323------错了～")
            }
        })
        alert('You have deleted the information: ' + this.state.value);   
    }*/
    postData = ()=> {
        //
        let url = "http://2738y998r4.wicp.vip:10557/TrafficSign_API/UpdateItem";//接口地址
        fetch(url, 
        {
		   method: "POST",
		   mode: "cors",
           headers: 
           {
		    	"Content-Type": "application/x-www-form-urlencoded"
		   },
           body:'ObjectID='+this.state.ObjectID
	  }).then(response=>response.json())
	    .catch((error)=> {
	          console.error(error);
	    });
    alert('You have deleted the information:\n ' + 
      '\nObjectID: '+this.state.ObjectID
      );
	}

    render() {
      return <div>
          <form onSubmit={this.handleSubmit}>
        {'ObjectID:'}
              <input 
              type="text" 
              value={this.state.ObjectID} 
              onChange={this.handleChangeInput1}
              placeholder="please input"
              /> 
              <br/>
              <input type="submit" value="确定删除" />
              </form>
             </div>;
    }
  }
//<button onClick={this.handleChangeButton}>确定删除</button>
  class HelloMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'Hello Runoob!'};
        this.handleChange = this.handleChange.bind(this);
    }
   
    handleChange(event) {
      this.setState({value: event.target.value});
    }
    render() {
        var value = this.state.value;
        return <div>
                  {'value:'}
                <input type="text" value={value} onChange={this.handleChange} /> 
                <h4>{value}</h4>
               </div>;
    }
   
  }
//查询点坐标信息
  class Enquiryvalue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            ObjectID:null,
            mydatas:
                [{
                    No:null,
                    TypeID:null,
                    ObjectID:null,
                    Name:null,
                    Longitude:null,
                    Latitude:null,
                    CreateTime:null,
                    Location:null,
                    Remark:null,
                    Modify_Record:null,
            }],
        };
        //this.handleChangeButton = this.handleChangeButton.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeInput=this.handleChangeInput.bind(this);
        this.handleChangeInput1=this.handleChangeInput1.bind(this);
    }
    
    handleChangeInput(event){
        this.setState({value: event.target.value});
      }
    handleChangeInput1(event){
        this.setState({ObjectID: event.target.value});
      }
      handleSubmit(event) {
      this.setState({value:null});
      this.postData();
      console.log(this.state);
    }
    postData = ()=> {
        //
        let url = "https://cricketsbrother.github.io/new.json";//接口地址
        fetch(url, 
        {
		   method: "POST",
		   mode: "cors",
           headers: 
           {
		    	"Content-Type": "application/x-www-form-urlencoded"
		   },
           body:'ObjectID='+this.state.ObjectID
      }).then(response=>response.json())
      .then(
        (res)=>{
            this.setState({
               mydatas:
                {
                    No:res.No,
                    TypeID:res.TypeID,
                    ObjectID:res.ObjectID,
                    Name:res.Name,
                    Longitude:res.Longitude,
                    Latitude:res.Latitude,
                    CreateTime:res.CreateTime,
                    Location:res.Location,
                    Remark:res.Remark,
                    Modify_Record:res.Modify_Record,
                },
            })
        }
    );
    //.catch((error)=> {
	          //console.error(error);
        //});
    alert('the information:\n ' + 
      'value: '+this.state.value+
      '\nObjectID: '+this.state.ObjectID
      );
	}
    render() {
        return (
            <div>
  
            </div>
        );
    }

  }

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
          
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }

var Root = function Root() {
    return React.createElement(
        "div", {
            className: "Root"
        },
        React.createElement(
            Tabs, {
                selected: 0//初始选定
            },
            React.createElement(
                TabList,
                null,
                React.createElement(
                    Tab,
                    null,
                    React.createElement(
                        Button,
                        null,
                        "Map"
                    )
                ),
                React.createElement(
                    Tab,
                    null,
                    React.createElement(
                        Button,
                        null,
                        "Add"
                    )
                ),
                React.createElement(
                    Tab,
                    null,
                    React.createElement(
                        Button,
                        null,
                        "Delete"
                    )
                ),
                React.createElement(
                    Tab,
                    null,
                    React.createElement(
                        Button,
                        null,
                        "Modify"
                    )
                ),
                React.createElement(
                    Tab,
                    null,
                    React.createElement(
                        Button,
                        null,
                        "Enquiry"
                    )
                )
            ),// React.createElement:TabList
            React.createElement(
                TabPanel,
                null,
                /*
                <Map 
                amapkey ={'1bb9ee64ab614ea1523647c2df308ab0'}
                zoom= {zoomvalue}//原始地图缩放
                //zoomEnable={false}//不支持手动缩放
                center={[103.984111056,30.76196695635]}//设置初始中心坐标
                //center={[mysigns[0].longitude,mysigns[0].latitude]}
                >
                <Marker
                position={[103.984111056,30.76196695635]}
                >
                </Marker> 
                </Map>
                */
                //<div id="webgis-demo"></div>
                <Getdata0 />,
            ),
            React.createElement(
                TabPanel,
                null,
                <Clock />,
                <Addvalue/>,
            ),
            React.createElement(
                TabPanel,
                null,
                <Clock />,
                <Deletevalue/>,
                //<h>{element}</h>,
                //<UserGist />
            ),
            React.createElement(
                TabPanel,
                null,
                <Clock />,
            ),
            React.createElement(
                TabPanel,
                null,
                <Clock />,
                <Enquiryvalue/>,
            ),
        )
    );//return React.createElement
};

/*
 * Tabs is the stateful component.
 * You can pass an index in the `selected` prop
 * to specify which tab is active by default.
 *
 * This component handles the entire tabs system.
 * It transforms its own children (if they are Tab or TabPanel) to pass the
 * required props in order to run automatically the system.
 */

var Tabs = function(_Component) {
    _inherits(Tabs, _Component);

    function Tabs() {
        var _temp, _this, _ret;

        _classCallCheck(this, Tabs);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this),
         _this.state = {selected: _this.props.selected}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    Tabs.prototype.setSelected = function setSelected(selected) {
        if (selected !== this.state.selected) {
            this.setState({
                selected: selected
            });
        }
    };

    Tabs.prototype.handleClick = function handleClick(tab) {
        var _this2 = this;

        return function() {
            return _this2.setSelected(tab);
        };
    };

    Tabs.prototype.renderTabList = function renderTabList(child) {
        var _this3 = this;

        var tab = 0;

        return React.cloneElement(child, {
            children: React.Children.map(child.props.children, function(childTab) {
                if (childTab.type.name === "Tab") {
                    var _isActive = tab === _this3.state.selected;
                    var _onClick = _this3.handleClick(tab);

                    tab++;

                    return React.cloneElement(childTab, {
                        _isActive: _isActive,
                        _onClick: _onClick
                    });
                }

                return childTab;
            })
        });
    };

    Tabs.prototype.renderChildren = function renderChildren(children) {
        var _this4 = this;

        var panel = 0;

        return React.Children.map(children, function(child) {
            if (child.type.name === "TabList") {
                return _this4.renderTabList(child);
            }

            if (child.type.name === "TabPanel") {
                var _isActive = panel === _this4.state.selected;

                panel++;

                return React.cloneElement(child, {
                    _isActive: _isActive
                });
            }

            return child;
        });
    };

    Tabs.prototype.render = function render() {
        return React.createElement(
            "div", {
                className: "Tabs"
            },
            this.renderChildren(this.props.children)
        );
    };

    return Tabs;
}(Component);

var TabList = function TabList(_ref) {
    var children = _ref.children;
    return React.createElement(
        "div", {
            className: "TabList"
        },
        children
    );
};

var Tab = function Tab(_ref2) {
    var _onClick = _ref2._onClick;
    var _isActive = _ref2._isActive;
    var children = _ref2.children;
    return React.createElement(
        "div", {
            className: "Tab  " + (_isActive ? "is-active" : ""),
            onClick: _onClick
        },
        children
    );
};

var TabPanel = function TabPanel(_ref3) {
    var _isActive = _ref3._isActive;
    var children = _ref3.children;
    return React.createElement(
        "div", {
            className: "TabPanel  " + (_isActive ? "is-active" : "")
        },
        children
    );
};

/* --- */

var Button = function Button(_ref4) {
    var children = _ref4.children;
    return React.createElement(
        "button", {
            className: "Button"
        },
        children
    );
};

render(React.createElement(Root, null), document.querySelector("#root"));
//document.querySelector("#root"):获取id="root"的元素

/*
ReactDOM.render(<App></App>, document.getElementById('root'));
const element=<h1>hello!</h1>
ReactDOM.render(element,document.getElementById('example'));
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
