import React, { Component } from 'react'
import List from './containers/List'
import {Header, Footer} from '../layout'
import { connect} from 'react-redux'
import { getCityDetail,updateCity,getRegion } from '../../redux/actions/city'
import { Link, browserHistory } from 'react-router'
class DetailComponent extends Component{
     constructor(props){
        super(props);
        const {id}=this.props.params;
        this.props.onGetCityDetail(id);
        this.props.onGetRegion();
        this.state={
             id,
            name:'',
            region_id:0,
            edited:false,
            isDataReady:false,
            loadingClass:'fa fa-cog fa-spin',
            loadingSubmitClass:'',
            updateStatus:null,
           noticeText:''
        }
    }
    componentWillReceiveProps(props){
        const { cityDetail:{data},listRegion } = props;
        if(props.cityDetail.data.id != undefined ){
            this.setState({
                name:data.name,
                region_id:data.region.id,
            })
        }
        this.setState({
            listRegion:listRegion.data,
            isDataReady:true,
            loadingSubmitClass:'',
            isDisabled:''
        });
   
        if(this.state.edited){
            const {name,region_id} =props.getUpdateResult.data.data;
            this.setState({name,region_id,updateStatus:true,noticeText:'Update success !!'});
        }
    }
    onSubmitUpdateCity(e){
        const {id,name,region_id} =this.state;
        if(!name.trim() || !region_id.trim()){
            this.setState({updateStatus:false,noticeText:'Name or region not null !!'});
            return
        }
        this.props.onUpdateCity(id,name,region_id);
        this.setState({loadingSubmitClass:'fa fa-spinner fa-spin',isDisabled:'disabled'});
        this.setState({edited:true})
    }
    notice(status,text){
        if(status==null){
            return;
        }
        if(status){
            return(
                <div className="alert alert-success" >
                    <strong>Success!</strong> {text}
                </div>)
        }else{
            return(
                    <div className="alert alert-danger" >
                        <strong>Danger!</strong> {text}
                </div>)
        }
            
        
    }
    loadData(show){
        if(!show){
            return(
                  <div className={this.state.pageLoading}>
                  <center >
                    <div className="loading">
                        <i className={this.state.loadingClass}></i>
                    </div>
                  </center>
                  </div>
            );
        }
        return(
            <div>
                
                {this.notice(this.state.updateStatus,this.state.noticeText)}
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="email">City Name:</label>
                        <div className="col-sm-10">
                        <input type="hidden" value={this.state.id} />
                        <input type="text" value={this.state.name} 
                            onChange={(e)=> this.setState({name:e.target.value})}
                            className="form-control" id="email" placeholder="City Name"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="email">Region:</label>
                        <div className="col-sm-10">
                            <select className="form-control" value={this.state.region_id }  onChange={(e)=> this.setState({region_id:e.target.value})} >
                                <option value="" >Please choose region</option>
                                {this.state.listRegion.map(region =>
                                <option key={region.id}  value={region.id}  >{region.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="form-group"> 
                        <div className="col-sm-offset-2 col-sm-10">
                        <button type="button" onClick={this.onSubmitUpdateCity.bind(this)} className="btn btn-default">
                        <i className={this.state.loadingSubmitClass}></i>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )

    }
    render(){
        const user=JSON.parse(localStorage.getItem("qsdkUser")) || null;
        if(user==null){
            setTimeout(()=>{var Router = require('react-router');
            Router.browserHistory.push('/login');},100)
        }
        return(
            <div>
            <Header data={user}/>
                <div className="container">
                <button onClick={() => browserHistory.push('/city')} className="btn btn-default">Back to list</button>
                    <h1>City Detail</h1>
                    {this.loadData(this.state.isDataReady)}
                </div>
            <Footer/>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch){
    return { onGetCityDetail:(id)=> dispatch(getCityDetail.bind(null,id)),
         onUpdateCity:(id,name,region_id)=> dispatch(updateCity.bind(null,id,name,region_id)),
         onGetRegion:()=> dispatch(getRegion),
        }
}

export default connect(
    (state, ownProps) =>({
        cityDetail : state.city.cityDetail,
        getUpdateResult: state.city.updateCity,
        listRegion : state.city.getRegion,
    }),
  mapDispatchToProps
)(DetailComponent)