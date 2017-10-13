import React, { Component } from 'react';
import './app.css';
import {Button} from 'react-bootstrap'
import { connect } from 'react-redux';
import {createCourses,deleteCourses,doneCourses} from './actions/courseActions';
import {createBoxes,deleteBoxes,doneBoxes,hideBoxes} from './actions/createBoxes';
import SlidePanel from './components/slidePanel';
import {bindActionCreators} from 'redux';
//import {courseActions} from './actions/courseActions'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    course:  Object.assign({},props.course),
    statusToast   :  Object.assign({},props.box)
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.courseRow = this.courseRow.bind(this);
  
  }
  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
  //  this.setState({ course: course });
  }
  onDescriptionChange(event) {
   const course = this.state.course;
    course.description = event.target.value;
   // this.setState({ course: course });
  }



  onClickSave() {
    const statusToast = this.state.statusToast;
    statusToast.id = 0;
    statusToast.show = 1;
    statusToast.msg = "Congrats! You've Successfully added a To-Do";  
    const course = this.state.course;
    course.date = new Date();
    course.completed = false;
    if(isNaN(this.state.course.id))
    {
      course.id =0;
    }
    else{
    course.id = this.state.course.id + 1;
  }
   // this.setState({ course: course });
   //console.log(course);
  
   this.props.createCourses(course);
   this.props.createBoxes(statusToast);
  }
  courseRow(course, index) {
    return <div key={index} className="listToDo">{course.title}
    <div className = "pull-right" >
    <Button bsStyle= "info" bsSize="small" className="btn"  type= "submit" onClick = {()=>this.onEdit}>Edit</Button>
    <Button bsStyle="success" bsSize="small" className="btn" type= "submit" onClick = {()=>this.onDone}>Done</Button>
    <Button bsStyle= "danger" bsSize="small" className="btn" type = "submit" onClick = {()=>this.props.deleteCourses(course)} >Delete</Button>
   </div></div>;
  }
 forceUpdate()
 {
   this.props.hideBoxes (this.props.statusToast);
 }

  render() {
    let msgbox;
  
    if (this.props.statusToast.show === 1) {
      msgbox = <div className="msgbox">{this.props.statusToast.msg}</div>;
    
        this.t1 = setTimeout(() => this.forceUpdate(), 3950)
      
    }
    else {
      msgbox = <div></div>;
    }
   
    return (
      <div className="App">
        <div className="row">
          {msgbox}
          <div className="col-lg-3">
            <input type="text"
              onChange={this.onTitleChange}
              placeholder="Add-To-Do"
              value={this.state.course.title}
              className="todobox" />
            <input type="text"
              onChange={this.onDescriptionChange}
              placeholder="Add Description"
              value={this.state.course.description}
              className="todobox" />
            <br />
            <button type="submit"
              onClick={this.onClickSave}
              className="todobutton">Add To-do</button>
            {this.props.courses.map(this.courseRow)}
          </div>
          <div  className="col-lg-9">
            <SlidePanel boxdata = {this.props.courses}></SlidePanel>
          </div>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state, ownProps) {
 
  return {
    courses: state.courses,
    statusToast : state.statusToast

  };
}
function mapDispatchToProps(dispatch)
{
  return bindActionCreators({createCourses : createCourses,
                             deleteCourses: deleteCourses,
                             createBoxes: createBoxes, 
                             deleteBoxes:deleteBoxes,      
                             hideBoxes :hideBoxes
                             },dispatch);

}

export default connect(mapStateToProps,mapDispatchToProps)(App);
