import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Map,Marker,Markers,Text,InfoWindow} from 'react-amap';
import AMap from 'react-amap';
import 'jquery/src/jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';


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
const btstyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: '#fff',
    padding: '10px'
}

const ZoomCtrl = (props) => {
    const map = props.__map__;
    if (!map) {
      console.log('组件必须作为 Map 的子组件使用');
      return;
    }
    
    const zoomIn = () => map.zoomIn();
    const zoomOut = () => map.zoomOut();
  
    return (<div style={btstyle}>
      <button onClick={zoomIn}>zoom in</button>
      <button onClick={zoomOut}>zoom out</button>
    </div>);
  };


//红绿灯
const hldstyleA = {//红色
    border: '1px solid #000',
    borderRadius:'50%',
    //color: '#f00',
    backgroundColor: '#f00',
    width: '8px',
    height: '8px',
}
const hldstyleB = {//绿色
    border: '1px solid #000',
    borderRadius:'50%',
    //color: '#f00',
    backgroundColor: '#0f0',
    width: '8px',
    height: '8px',
}
const hldstyleC = {//黄色
    border: '1px solid #000',
    borderRadius:'50%',
    //color: '#f00',
    backgroundColor: '#ff0',
    width: '8px',
    height: '8px',
}
var urlicon='http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png';
//var urlicon;
const lkstyleA = {
    border: '1px solid #000',
    //color: '#f00',
    backgroundColor: '#f00',
    padding: '6px',
}
const lkstyleB = {
    border: '1px solid #000',
    //color: '#0f0',
    backgroundColor: '#0f0',
    padding: '6px',
}
const lkstyleC = {
    border: '1px solid #000',
    //color: '#00f',
    backgroundColor: '#00f',
    padding: '6px',
}
var url00='http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png';
var styleC = {
    background: `url(`+url00+`)`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '30x',
    height: '40px',
    color: '#000',
    textAlign: 'center',
    lineHeight: '40px'
  }
//Map的批量点显示
class Getdata0 extends React.Component{
    constructor(props){//构造函数
        super(props)
        this.state={
            isDelete:false,
            isModify:false,
            curVisibleWindow:false,
            isModified:false,//判断是否更改
            ISAdd:false,//是否确定增加，即是否post
            //mylong:null,
            //mylat:null,
            
            modifyTypeID:null,
            modifyName:null,
            modifyLongitude:null,
            modifyLatitude:null,
            modifyCreateTime:null,
            modifyLocation:null,
            modifyRemark:null,
            
            showMarkerInfo:{
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
            },
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
            URLIcon:'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png',                
            mysigns:[
                {
                    longitude:null,
                    latitude:null
                }
            ],
            mylukuang:[
                {
                    rName:null,
                    rOID:null,
                    rStatus:1,
                    rLongitude:103.98052316623264,
                    rLatitude:30.761364203559026,
                    rRemark:null,
                    rTID:null,
                }
            ],
            myhonglvdeng:[
                {
                    Lt_Name:null,
                    Lt_No:null,
                    Lt_OID:null,
                    Lt_Status:1,
                    Lt_Longitude:103.98052316623264,
                    Lt_Latitude:30.761364203559026,
                }
            ],
        }
        this.markerExtData = { 
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
            URLIcon:'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png',

            rName:null,
            rOID:null,
            rStatus:null,
            rLongitude:103.98052316623264,
            rLatitude:30.761364203559026,
            rRemark:null,
            rTID:null,

            Lt_Name:null,
            Lt_No:null,
            Lt_OID:null,
            Lt_Status:1,
            Lt_Longitude:103.98052316623264,
            Lt_Latitude:30.761364203559026,

        }
        this.markerEvents = {
              click: (e) => {
                const marker = e.target;
                marker.render(this.renderMarkerClick);
                //console.log(this.state.center);
              },
              rightclick: (e) => {
                const marker =e.target;
                marker.render(this.renderMarkerRightClick);
              },
              /*
              mouseup: (e) => {
                const marker =e.target;
                marker.render(this.renderMarkerMouseUp);
              },*/
              /*
              mouseover:(e) => {
                const marker = e.target;
                marker.render(this.renderMarker);
              },
              mouseout:(e) => {
                const marker = e.target;
                marker.render(this.renderMarkerHover);
              },
              */
        }
    //路况标识事件
    this.lkmarkerEvents = {
        click: (e) => {
          const marker = e.target;
          marker.render(this.renderLkMarkerClick);
        },
    }
    //红绿灯标识事件
    this.hldmarkerEvents = {
        click: (e) => {
          const marker = e.target;
          marker.render(this.renderHldMarkerClick);
        },   
    }
    //地图事件
    this.mapEvents = {
        rightclick: (e) => {
            var mylong=e.lnglat.getLng();
            var mylat=e.lnglat.getLat();
            this.setState({
                showMarkerInfo:{
                    Longitude:mylong,
                    Latitude:mylat,
                    TypeID:'',
                    Name:'',
                    Location:'',
                    Remark:'',
                },
                modifyLongitude:mylong,
                modifyLatitude:mylat,
                modifyTypeID:'',
                modifyName:'',
                modifyRemark:'',
                modifyLocation:'',
            },()=>{
                console.log(this.state.showMarkerInfo.Longitude+","+this.state.showMarkerInfo.Latitude);
                console.log("++"+mylong+","+mylat);
            });
            this.setState({
                ISAdd:true,
            },()=>{});
        },
    }
    this.closeWindow=this.closeWindow.bind(this);
    this.renderMarkerClick=this.renderMarkerClick.bind(this);
    this.renderMarkerRightClick=this.renderMarkerRightClick.bind(this);
    this.deleteEnable=this.deleteEnable.bind(this);
    this.closeFunc=this.closeFunc.bind(this);
    this.closeAdd=this.closeAdd.bind(this);
    this.sureAdd=this.sureAdd.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
    this.handleChange6 = this.handleChange6.bind(this);
    this.handleChange8 = this.handleChange8.bind(this);
    this.handleChange9 = this.handleChange9.bind(this);
    //this.renderMarkerMouseUp=this.renderMarkerMouseUp.bind(this); 
}
//鼠标右击的修改
renderMarkerRightClick(extData){
    this.setState({
        isModify:true,
        isModified:false,
        showMarkerInfo:{
            Longitude:extData.Longitude,
            Latitude:extData.Latitude,
            No:extData.No,
            TypeID:extData.TypeID,
            ObjectID:extData.ObjectID,
            Name:extData.Name,
            CreateTime:extData.CreateTime,
            Location:extData.Location,
            Remark:extData.Remark,
            Modify_Record:extData.Modify_Record,
        },
        modifyTypeID:extData.TypeID,
        modifyName:extData.Name,
        modifyLongitude:extData.Longitude,
        modifyLatitude:extData.Latitude,
        modifyCreateTime:extData.CreateTime,
        modifyLocation:extData.Location,
        modifyRemark:extData.Remark,
    },()=>{
        //console.log(this.state.showMarkerInfo);
    });
}
/*
renderMarkerMouseUp(extData){
    this.setState({
        showMarkerInfo:{
            Longitude:extData.Longitude,
            Latitude:extData.Latitude,
            No:extData.No,
            TypeID:extData.TypeID,
            ObjectID:extData.ObjectID,
            Name:extData.Name,
            CreateTime:extData.CreateTime,
            Location:extData.Location,
            Remark:extData.Remark,
            Modify_Record:extData.Modify_Record,
        },
    });
    console.log("up");
}*/
//红绿灯信息
renderHldMarker(extData){
    //console.log(extData);
    if(extData.Lt_Status === 1)
    {
        return <div style={hldstyleA}></div>      
    }
    else if(extData.Lt_Status === 2)
    {
        return <div style={hldstyleB}></div>
    }
    else
    {
        return <div style={hldstyleC}></div>   
    }
    
}
//手动改变红绿灯
renderHldMarkerClick(extData){
    let url = "http://2738y998r4.wicp.vip:10557/TrafficRoad_API/TrafficLight_Status";//接口地址
    if(extData.Lt_Status === 1)
    {
        extData.Lt_Status=2;
        fetch(url, 
        {
		   method: "POST",
		   mode: "cors",
           headers: 
           {
		    	"Content-Type": "application/x-www-form-urlencoded"
		   },
           body:'Lt_OID='+extData.Lt_OID+'&Lt_Status='+extData.Lt_Status
      }).then(response=>response.json())
      .then();
        //this.lhd=extData;
        return <div style={hldstyleB}></div>
    }
    else if(extData.Lt_Status === 2)
    {
        extData.Lt_Status=3;
        fetch(url, 
        {
		   method: "POST",
		   mode: "cors",
           headers: 
           {
		    	"Content-Type": "application/x-www-form-urlencoded"
		   },
           body:'Lt_OID='+extData.Lt_OID+'&Lt_Status='+extData.Lt_Status
      }).then(response=>response.json())
      .then();
        //this.lhd=extData;
        return <div style={hldstyleC}></div>
    }
    else
    {
        extData.Lt_Status=1;
        fetch(url, 
        {
		   method: "POST",
		   mode: "cors",
           headers: 
           {
		    	"Content-Type": "application/x-www-form-urlencoded"
		   },
           body:'Lt_OID='+extData.Lt_OID+'&Lt_Status='+extData.Lt_Status
      }).then(response=>response.json())
      .then();
        //this.lhd=extData;
        return <div style={hldstyleA}></div>
    }
}
//路况标识信息
    renderLkMarker(extData){
        //console.log(extData);
        if(extData.rStatus === 1)
        {
            return <div style={lkstyleB}></div>
        }
        else
        {
            return <div style={lkstyleA}></div>
        }
        
    }

    renderLkMarkerClick(extData){
        alert("路况信息为:\n"+
        "rName: "+extData.rName+"\n"+
        "rOID: "+extData.rOID+"\n"+
        "rStatus: "+extData.rStatus+"\n"+
        "rLongitude: "+extData.rLongitude+"\n"+
        "rLatitude: "+extData.rLatitude+"\n"+
        "rRemark: "+extData.rRemark+"\n"+
        "rTID: "+extData.rTID);
    }
//普通标识信息
    renderMarker(extData){
        let url = "http://2738y998r4.wicp.vip:10557/TrafficSign_API/GetIconURL";//接口地址
        fetch(url, 
        {
		   method: "POST",
		   mode: "cors",
           headers: 
           {
		    	"Content-Type": "application/x-www-form-urlencoded"
		   },
           body:'ObjectID='+extData.ObjectID
      }).then(response=>response.json())
      .then(
        (res)=>{
            var temp=res[0];
            //if(temp.URLIcon!=null)
                extData.URLIcon=temp.URLIcon;
        }
    );
        //this.postData();
        //urlicon=this.state.URLIcon;
        //alert(urlicon);
        //extData.URLIcon='http://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573374661&di=734ada8f5e8390afb4943587b7a80403&imgtype=jpg&er=1&src=http%3A%2F%2Fs9.rr.itc.cn%2Fr%2FwapChange%2F20166_29_15%2Fa3orrs2623359378352.jpg';
        console.log(extData.URLIcon);
        //urlicon=extData.URLIcon;
        var styleB = {
            background: `url(`+extData.URLIcon+`)`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '30px',
            height: '40px',
            color: '#000',
            textAlign: 'center',
            lineHeight: '40px'
        }
        return <div style={styleB}></div>
      }
    renderMarkerHover(extData){
        return <div style={styleC}></div>
      }

    //鼠标左键单击标识进行查询删除
    renderMarkerClick(extData){
        if(this.state.isDelete===true)//是删除
        {
            //上传删除信息
            let url = "http://2738y998r4.wicp.vip:10557/TrafficSign_API/UpdateItem";//接口地址
            fetch(url, 
            {
            method: "POST",
            mode: "cors",
            headers: 
            {
                    "Content-Type": "application/x-www-form-urlencoded"
            },
            body:'ObjectID='+extData.ObjectID
            }).then(response=>response.json())
            .catch((error)=> {
                console.error(error);
            });
            //更新标识数量
            this.fetchData();
        }
        else//是查询
        {
            this.setState({
                curVisibleWindow:true,
                showMarkerInfo:{
                    Longitude:extData.Longitude,
                    Latitude:extData.Latitude,
                    No:extData.No,
                    TypeID:extData.TypeID,
                    ObjectID:extData.ObjectID,
                    Name:extData.Name,
                    CreateTime:extData.CreateTime,
                    Location:extData.Location,
                    Remark:extData.Remark,
                    Modify_Record:extData.Modify_Record,
                },
              });
        }
        
    }
      componentDidMount() {
        this.fetchData();
        //this.fetchLkData();
        //周期性查询红绿灯状态
        this.timerID2 = setInterval(
            () => this.fetchHldData(),
            5000
        );
        //this.fetchHldData();
        //查询路况状态
        this.timerID = setInterval(
          () => this.fetchLkData(),
          //console.log("hello"),
          //() => this.fetchData(),
          10000
        );

        //周期性改变红绿灯状态
        this.timerID1 = setInterval(
            () => this.changeHldData(),
            10000
        );
        //获取当前的地图中心
        
      }
    
      componentWillUnmount() {
        clearInterval(this.timerID2);
        clearInterval(this.timerID);
        clearInterval(this.timerID1);
      }
      



    /*
      tick() {
        this.setState({
          date: new Date()
        });
      }
      */
    /*
    componentDidMount(){
        this.fetchData();
        console.log(this.state);
    }
    */
    //起初获取全部路况标识信息
    fetchLkData=()=>{
        //http://2738y998r4.wicp.vip:10557/TrafficRoad_API/RoadStatus
        //https://cricketsbrother.github.io/Dec1.json
        fetch('http://2738y998r4.wicp.vip:10557/TrafficRoad_API/RoadStatus',{method:"GET"})
        .then(response=>{return response.json()})
        .then(
            (res)=>{
                this.setState({
                    mylukuang:res,
                })
            }
        ).catch(err=>{console.log('errroesaa!')})
        //console.log(this.state.mylukuang);    
    }
    fetchSingleData = ()=> {
        //
        let url = "http://2738y998r4.wicp.vip:10557/TrafficSign_API/GetItem";//接口地址
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
            var temp=res[0];
            this.setState({
               mydatas:
                {
                    No:temp.No,
                    TypeID:temp.TypeID,
                    ObjectID:temp.ObjectID,
                    Name:temp.Name,
                    Longitude:temp.Longitude,
                    Latitude:temp.Latitude,
                    CreateTime:temp.CreateTime,
                    Location:temp.Location,
                    Remark:temp.Remark,
                    Modify_Record:temp.Modify_Record,
                },
            })
        }
    );
    console.log("查询成功");
	}
    fetchHldData=()=>{
        //http://2738y998r4.wicp.vip:10557/TrafficRoad_API/RoadStatus
        //https://cricketsbrother.github.io/lll.json
        //http://2738y998r4.wicp.vip:10557/TrafficRoad_API/TrafficLight_Status
        fetch('http://2738y998r4.wicp.vip:10557/TrafficRoad_API/TrafficLight_Status',{method:"GET"})
        .then(response=>{return response.json()})
        .then(
            (res)=>{
                this.setState({
                    myhonglvdeng:res,
                })
            }
        ).catch(err=>{console.log('errroesaa!')})
        //console.log("fetch!");    
    }
    //起初获取全部标识牌信息
    fetchData=()=>{
        //https://cricketsbrother.github.io/new.json
        //https://cricketsbrother.github.io/fk.json
        //http://2738y998r4.wicp.vip:10557/TrafficSign_API/SignBase
        fetch('https://cricketsbrother.github.io/new.json',{method:"GET"})
        .then(response=>{return response.json()})
        .then(
            (res)=>{
                this.setState({
                   mydatas:res,
                   mysigns:myarr
                })
            }
        ).catch(err=>{console.log('errroesaa!')})
            
    }
    //周期性改变红绿灯状态
    changeHldData=()=>{
        
        let url = "http://2738y998r4.wicp.vip:10557/TrafficRoad_API/changeStatus";//接口地址
        fetch(url, 
            {
               method: "POST",
               mode: "cors",
               headers: 
               {
                    "Content-Type": "application/x-www-form-urlencoded"
               },
               //body:'Lt_OID='+null+'&Lt_Status='+null
          }).then(response=>response.json())
          .then();
          //console.log("changed");
    }
    //关闭信息窗
    closeWindow(){
        if(this.state.isModify===true && this.state.isModified===true)//上传修改信息
        {
            console.log("上传修改");
            let url = "http://2738y998r4.wicp.vip:10557/TrafficSign_API/SignItem/-1";//接口地址
            fetch(url, 
            {
                method: "POST",
                mode: "cors",
                headers: 
                {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body:
                'No='+this.state.showMarkerInfo.No+
                '&TypeID='+this.state.modifyTypeID+
                '&ObjectID='+this.state.showMarkerInfo.ObjectID+
                '&Name='+this.state.modifyName+
                '&Longitude='+this.state.modifyLongitude+
                '&Latitude='+this.state.modifyLatitude+
                '&CreateTime='+this.state.showMarkerInfo.CreateTime+
                '&Location='+this.state.modifyLocation+
                '&Remark='+this.state.modifyRemark+
                '&Modify_Record='+this.state.showMarkerInfo.Modify_Record
                }).then(response=>response.json())
            .catch((error)=> {
                    console.error(error);
            });
            console.log("修改成功");
            //更新修改信息
            this.fetchData();
        }
        //关闭信息窗口
        this.setState({
          curVisibleWindow: false,
          isModify:false,
          isModified:false,
          ISAdd:false,
        });
      }
    //使删除有效
    deleteEnable(){
        this.setState({
            isDelete:true,
        },()=>{
            console.log(this.state.isDelete);
        })
    }
    //关闭除查询外的所有功能
    closeFunc(){
        this.setState({
            isDelete:false,
        },()=>{
            console.log(this.state.isDelete);
        })
    }
    //关闭增加标志的信息框
    closeAdd(){
        this.setState({
            ISAdd:false,
            modifyTypeID:null,
            modifyName:null,
            modifyLongitude:null,
            modifyLatitude:null,
            modifyLocation:null,
            modifyRemark:null,
        },()=>{});
    }
    //关闭增加标志的信息框，并且上传增加信息
    sureAdd(){
        let url = "http://2738y998r4.wicp.vip:10557/TrafficSign_API/SignBase";//接口地址
            fetch(url, 
            {
                method: "POST",
                mode: "cors",
                headers: 
                {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body:
                'TypeID='+this.state.modifyTypeID+
                '&Name='+this.state.modifyName+
                '&Longitude='+this.state.modifyLongitude+
                '&Latitude='+this.state.modifyLatitude+
                '&Location='+this.state.modifyLocation+
                '&Remark='+this.state.modifyRemark
                }).then(response=>response.json())
            .catch((error)=> {
                    console.error(error);
            });
        this.setState({
            ISAdd:false,
            modifyTypeID:null,
            modifyName:null,
            modifyLongitude:null,
            modifyLatitude:null,
            modifyLocation:null,
            modifyRemark:null,
        },()=>{});
        this.fetchData();
    }
    //修改框
    handleChange3(event) {
        this.setState({
            isModified:true,
            modifyTypeID:event.target.value,
        },()=>{});
      }
    handleChange4(event) {
        this.setState({
            isModified:true,
            modifyName:event.target.value,
        },()=>{});
      }
      handleChange5(event) {
        this.setState({
            isModified:true,
            modifyLongitude:event.target.value,
        },()=>{});
      }
      handleChange6(event) {
        this.setState({
            isModified:true,
            modifyLatitude:event.target.value,
        },()=>{});
      }
      handleChange8(event) {
        this.setState({
            isModified:true,
            modifyLocation:event.target.value,
        },()=>{});
      }
      handleChange9(event) {
        this.setState({
            isModified:true,
            modifyRemark:event.target.value,
        },()=>{});
      }

    render()
    {
        const{mydatas,mysigns,mylukuang,myhonglvdeng,showMarkerInfo}=this.state;
        return(
            <Map 
                amapkey ={'1bb9ee64ab614ea1523647c2df308ab0'}
                zoom= {zoomvalue}//原始地图缩放
                //zoomEnable={false}//不支持手动缩放
                center={[103.98913620876736,30.76766140407926]}//设置初始中心坐标
                plugins={['Scale','ToolBar','MapType','OverView']}
                resizeEnable= {true}
                events={this.mapEvents}
            >
            
            
            {mydatas.map(mydata=>(

            <Marker
            position={[mydata.Longitude,mydata.Latitude]}
            clickable
            
            events={this.markerEvents}
            extData={mydata}
            /> ))}

            {mylukuang.map(lukuang=>(
            <Marker
            position={[lukuang.rLongitude,lukuang.rLatitude]}
            clickable
            render={this.renderLkMarker}
            events={this.lkmarkerEvents}
            extData={lukuang}
            /> ))}

            {myhonglvdeng.map(hld=>(
            <Marker
            position={[hld.Lt_Longitude,hld.Lt_Latitude]}
            clickable
            render={this.renderHldMarker}
            events={this.hldmarkerEvents}
            extData={hld}
            /> ))}

            <InfoWindow
            position={[showMarkerInfo.Longitude,showMarkerInfo.Latitude]}
            visible={this.state.curVisibleWindow}
            isCustom
            >
            <div>
            <h3 className="mystyle1">标志信息</h3>
            <p>序号: {showMarkerInfo.No}</p>
            <p>类型: {showMarkerInfo.TypeID}</p>
            <p>标志码: {showMarkerInfo.ObjectID}</p>
            <p>标识名称: {showMarkerInfo.Name}</p>
            <p>经度: {showMarkerInfo.Longitude}</p>
            <p>维度: {showMarkerInfo.Latitude}</p>
            <p>所在路段: {showMarkerInfo.Location}</p>
            <p>创建日期: {showMarkerInfo.CreateTime}</p>
            <p>备注: {showMarkerInfo.Remark}</p>
            <p>修改记录: {showMarkerInfo.Modify_Record}</p>
            <div className="mystyle1">
            <button className="btn btn-primary" onClick={() => {this.closeWindow()}}>关闭</button>
            </div>
            </div>
          </InfoWindow>

          <InfoWindow
            position={[showMarkerInfo.Longitude,showMarkerInfo.Latitude]}
            visible={this.state.isModify}
            isCustom={false}
          >
            <div className="mapInfo1">
            <h3 className="mystyle1">标志修改</h3>
            <span className="glyphicon glyphicon-edit">{"标志类型 "}</span>
              <input type="text" defaultValue={this.state.showMarkerInfo.TypeID} onChange={this.handleChange3} className="input input-sm"/> 
              <br />
            <span className="glyphicon glyphicon-edit">{"标识名称 "}</span>
              <input type="text" defaultValue={this.state.showMarkerInfo.Name} onChange={this.handleChange4} className="input input-sm"/> 
              <br />
        <span className="glyphicon glyphicon-edit">{"经度   "}</span>
              <input type="text" defaultValue={this.state.showMarkerInfo.Longitude} onChange={this.handleChange5} className="input input-sm"/>
              <br /> 
        <span className="glyphicon glyphicon-edit">{"维度   "}</span>
              <input type="text" defaultValue={this.state.showMarkerInfo.Latitude} onChange={this.handleChange6} className="input input-sm"/> 
              <br />
        <span className="glyphicon glyphicon-edit">{"所在路段 "}</span>
              <input type="text" defaultValue={this.state.showMarkerInfo.Location} onChange={this.handleChange8} className="input input-sm"/> 
              <br />
        <span className="glyphicon glyphicon-edit">{"备注   "}</span>
              <input type="text" defaultValue={this.state.showMarkerInfo.Remark} onChange={this.handleChange9} className="input input-sm"/> 
              <br />
            <div className="mystyle1">
            <button className="btn btn-primary" onClick={() => {this.closeWindow()}}>确定修改</button>
            </div>
            </div>
          </InfoWindow>

          <InfoWindow
            position={[showMarkerInfo.Longitude,showMarkerInfo.Latitude]}
            visible={this.state.ISAdd}
            isCustom={false}
          >
            <div className="mapInfo1">
            <h3 className="mystyle1">标志增加</h3>
        <span className="glyphicon glyphicon-edit">{"标志类型 "}</span>
              <input type="text" defaultValue={""} onChange={this.handleChange3} className="input input-sm"/> 
              <br />
        <span className="glyphicon glyphicon-edit">{"标识名称 "}</span>
              <input type="text" defaultValue={""} onChange={this.handleChange4} className="input input-sm"/> 
              <br />
        <span className="glyphicon glyphicon-edit">{"经度   "}</span>
              <input type="text" defaultValue={this.state.showMarkerInfo.Longitude} onChange={this.handleChange5} className="input input-sm"/>
              <br /> 
        <span className="glyphicon glyphicon-edit">{"维度   "}</span>
              <input type="text" defaultValue={this.state.showMarkerInfo.Latitude} onChange={this.handleChange6} className="input input-sm"/> 
              <br />
        <span className="glyphicon glyphicon-edit">{"所在路段 "}</span>
              <input type="text" defaultValue={""} onChange={this.handleChange8} className="input input-sm"/> 
              <br />
        <span className="glyphicon glyphicon-edit">{"备注   "}</span>
              <input type="text" defaultValue={""} onChange={this.handleChange9} className="input input-sm"/> 
              <br />
            <div className="mystyle1">
            <button className="btn btn-primary" onClick={this.sureAdd}>确定增加</button>
            <button className="btn btn-primary" onClick={this.closeAdd}>关闭</button>
            </div>
            </div>
          </InfoWindow>
          
          <div style={btstyle}>
            <button onClick={this.deleteEnable}>删除</button>
            <button onClick={this.closeFunc}>关闭功能</button>
        </div>
            </Map>
        )
    }
}
//render={this.renderMarker}
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
    console.log("添加成功:"+this.state.ObjectID);
	}

    render() {
      return (
          <div className="mystyle">
            <br />
        <h3>{"添加标志信息"}</h3>
        <form onSubmit={this.handleSubmit}>
            <br />
      <span className="glyphicon glyphicon-pencil">{"No    :"}</span>
            <input type="text" value={this.state.No} onChange={this.handleChange1} className="input input-sm"/> 
            <br />
            <br />
      <span className="glyphicon glyphicon-pencil">{"TypeID   :"}</span>
            <input type="text" value={this.state.TypeID} onChange={this.handleChange2} className="input input-sm"/> 
            <br />
            <br />
      <span className="glyphicon glyphicon-pencil">{"ObjectID  :"}</span>
            <input type="text" value={this.state.ObjectID} onChange={this.handleChange3} className="input input-sm"/> 
            <br />
            <br />
      <span className="glyphicon glyphicon-pencil">{"Name   :"}</span>
            <input type="text" value={this.state.Name} onChange={this.handleChange4} className="input input-sm"/> 
            <br />
            <br />
      <span className="glyphicon glyphicon-pencil">{"Longitude  :"}</span>
            <input type="text" value={this.state.Longitude} onChange={this.handleChange5} className="input input-sm"/> 
            <br />
            <br />
      <span className="glyphicon glyphicon-pencil">{"Latitude  :"}</span>
            <input type="text" value={this.state.Latitude} onChange={this.handleChange6} className="input input-sm"/> 
            <br />
            <br />
      <span className="glyphicon glyphicon-pencil">{"CreateTime :"}</span>
            <input type="text" value={this.state.CreateTime} onChange={this.handleChange7} className="input input-sm"/> 
            <br />
            <br />
      <span className="glyphicon glyphicon-pencil">{"Location  :"}</span>
            <input type="text" value={this.state.Location} onChange={this.handleChange8} className="input input-sm"/> 
            <br />
            <br />
      <span className="glyphicon glyphicon-pencil">{"Remark   :"}</span>
            <input type="text" value={this.state.Remark} onChange={this.handleChange9} className="input input-sm"/> 
            <br />
            <br />
      <span className="glyphicon glyphicon-pencil">{"Modify_Record:"}</span>
            <input type="text" value={this.state.Modify_Record} onChange={this.handleChange10} className="input input-sm"/>
            <br /> 
          <input type="submit" className="btn btn-primary" value="确定增加" />
        </form>
         <br/>
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
    console.log("删除"+this.state.ObjectID+"成功");
	}

    render() {
      return <div className="deletestyle">
          <form onSubmit={this.handleSubmit}>
              <h4>
          <span className="glyphicon glyphicon-remove">    
              {'ObjectID:'}
              </span>
              <input 
              type="text" 
              value={this.state.ObjectID} 
              onChange={this.handleChangeInput1}
              placeholder="please input"
              className="input input-sm"
              />
               </h4>
              <br/>
              <input type="submit" className="btn btn-primary" value="确定删除" />
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
            },
        };
        //this.handleChangeButton = this.handleChangeButton.bind(this);
        this.handleChangeInput1=this.handleChangeInput1.bind(this);
        this.handleChangeButton = this.handleChangeButton.bind(this);
        this.handleChangeButton1 = this.handleChangeButton1.bind(this);
    }
    handleChangeButton(event) {
        this.postData();
        //alert("查询成功");
        //console.log("查询成功");
    }
    handleChangeButton1(event) {
        this.setState({
            value: null,
            ObjectID:null,
            mydatas:
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
            },
        });
        //alert("查询成功");
        //console.log(this.state.mydatas);
        //console.log("重置成功");
    }
    handleChangeInput1(event){
        this.setState({ObjectID: event.target.value});
      }
    postData = ()=> {
        //
        let url = "http://2738y998r4.wicp.vip:10557/TrafficSign_API/GetItem";//接口地址
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
            var temp=res[0];
            this.setState({
               mydatas:
                {
                    No:temp.No,
                    TypeID:temp.TypeID,
                    ObjectID:temp.ObjectID,
                    Name:temp.Name,
                    Longitude:temp.Longitude,
                    Latitude:temp.Latitude,
                    CreateTime:temp.CreateTime,
                    Location:temp.Location,
                    Remark:temp.Remark,
                    Modify_Record:temp.Modify_Record,
                },
            })
        }
    );
    alert("查询成功");
    console.log("查询成功");
	}
    render() {
        return (
            <div className="enquirystyle">
            <div className="enquirystyle1">
                <h4>
            <span className="glyphicon glyphicon-check">{'ObjectID:'}</span>
            <input 
              type="text" 
              value={this.state.ObjectID} 
              onChange={this.handleChangeInput1}
              placeholder="please input"
              className="input input-sm"
              /> 
              </h4>
              <div className="enquirystyle2">
                <div>
              <button onClick={this.handleChangeButton} className="btn btn-primary">确定查询</button>
              </div>
              <div>
              <button onClick={this.handleChangeButton1} className="btn btn-primary">重置</button>
              </div>
              </div>
              </div>

              <div className="enquirystyle3">
                  <div className="mystyle1">
                      <h2>
                      {"查询结果"}
                      </h2>
                    </div>
                <div className="enquirystyle4">
                  <h3>
                  {'No:'}{this.state.mydatas.No}
                  <br/>
                  <br/>
                  {'TypeID:'}{this.state.mydatas.TypeID}
                  <br/>
                  <br/>
                  {'ObjectID:'}{this.state.mydatas.ObjectID}
                  <br/>
                  <br/>
                  {'Name:'}{this.state.mydatas.Name}
                  <br/>
                  <br/>
                  {'Longitude:'}{this.state.mydatas.Longitude}
                  <br/>
                  <br/>
                  {'Latitude:'}{this.state.mydatas.Latitude}
                  <br/>
                  <br/>
                  {'CreateTime:'}{this.state.mydatas.CreateTime}
                  <br/>
                  <br/>
                  {'Location:'}{this.state.mydatas.Location}
                  <br/>
                  <br/>
                  {'Remark:'}{this.state.mydatas.Remark}
                  <br/>
                  <br/>
                  {'Modify_Record:'}{this.state.mydatas.Modify_Record}
                  </h3>
                  </div>
              </div>
            </div>
        );
    }

  }

  //修改标识信息
  class Modifyvalue extends React.Component {
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
        this.handleChangeButton = this.handleChangeButton.bind(this);
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
      handleChangeButton(event) {
        this.fetchData();
        //alert("查询成功");
        console.log("查询成功");
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
        console.log('You have modified the information:\n ' + 
        'No: '+this.state.No+
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
      fetchData = ()=> {
        //
        let url = "http://2738y998r4.wicp.vip:10557/TrafficSign_API/GetItem";//接口地址
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
            var temp=res[0];
            this.setState({
                    No:temp.No,
                    TypeID:temp.TypeID,
                    ObjectID:temp.ObjectID,
                    Name:temp.Name,
                    Longitude:temp.Longitude,
                    Latitude:temp.Latitude,
                    CreateTime:temp.CreateTime,
                    Location:temp.Location,
                    Remark:temp.Remark,
                    Modify_Record:temp.Modify_Record,
            })
        }
    );
    alert("查询成功");
    console.log("查询成功");
	}
      postData = ()=> {
          //
          let url = "http://2738y998r4.wicp.vip:10557/TrafficSign_API/SignItem/-1";//接口地址
          fetch(url, 
          {
             method: "POST",
             mode: "cors",
             headers: 
             {
                  "Content-Type": "application/x-www-form-urlencoded"
             },
             body:
             'No='+this.state.No+
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
      alert('You have modified the information:' + 
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
      console.log("添加成功:"+this.state.ObjectID);
      }
  
      render() {
        return (
            <div>
            <div className="mystyle">
                <br/>
              <form>
        <span className="glyphicon glyphicon-check">{"ObjectID   :"}</span>
              <input type="text" value={this.state.ObjectID} onChange={this.handleChange3} className="input input-sm"/> 
              <br />
              <br />
              <button onClick={this.handleChangeButton} className="btn btn-primary ">确定查询</button>
              </form>
              <br />
              <form onSubmit={this.handleSubmit}>
        <span className="glyphicon glyphicon-edit">{"No      :"}</span>
              <input type="text" value={this.state.No} onChange={this.handleChange1} className="input input-sm"/> 
              <br />
              <br />
        <span className="glyphicon glyphicon-edit">{"TypeID    :"}</span>
              <input type="text" value={this.state.TypeID} onChange={this.handleChange2} className="input input-sm"/> 
              <br />
              <br />
              <span className="glyphicon glyphicon-edit">{"Name    :"}</span>
              <input type="text" value={this.state.Name} onChange={this.handleChange4} className="input input-sm"/> 
              <br />
              <br />
        <span className="glyphicon glyphicon-edit">{"Longitude   :"}</span>
              <input type="text" value={this.state.Longitude} onChange={this.handleChange5} className="input input-sm"/> 
              <br />
              <br />
        <span className="glyphicon glyphicon-edit">{"Latitude   :"}</span>
              <input type="text" value={this.state.Latitude} onChange={this.handleChange6} className="input input-sm"/> 
              <br />
              <br />
        <span className="glyphicon glyphicon-edit">{"CreateTime  :"}</span>
              <input type="text" value={this.state.CreateTime} onChange={this.handleChange7} className="input input-sm"/> 
              <br />
              <br />
        <span className="glyphicon glyphicon-edit">{"Location   :"}</span>
              <input type="text" value={this.state.Location} onChange={this.handleChange8} className="input input-sm"/> 
              <br />
              <br />
        <span className="glyphicon glyphicon-edit">{"Remark    :"}</span>
              <input type="text" value={this.state.Remark} onChange={this.handleChange9} className="input input-sm"/> 
              <br />
              <br />
        <span className="glyphicon glyphicon-edit">{"Modify_Record:"}</span>
              <input type="text" value={this.state.Modify_Record} onChange={this.handleChange10} className="input input-sm"/> 
              <br />
              <br />
              <div className="mystyle1">
            <input type="submit" value="确定修改" className="btn btn-primary" ></input>
            </div>
            <br/>
          </form>
          </div>
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
          <h2>{this.state.date.toLocaleTimeString()}</h2>
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
                        "地图"
                    )
                ),
                React.createElement(
                    Tab,
                    null,
                    React.createElement(
                        Button,
                        null,
                        "添加"
                    )
                ),
                React.createElement(
                    Tab,
                    null,
                    React.createElement(
                        Button,
                        null,
                        "删除"
                    )
                ),
                React.createElement(
                    Tab,
                    null,
                    React.createElement(
                        Button,
                        null,
                        "修改"
                    )
                ),
                React.createElement(
                    Tab,
                    null,
                    React.createElement(
                        Button,
                        null,
                        "查询"
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
                <Modifyvalue/>,
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
