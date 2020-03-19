import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import Footer from './Footer';


  export default class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
          content: null,
          description: '',
          file: "",
          image:'',
          music: "",
          amount: '',
          genre: '',
          genredescription: '',
          genreCollection: [],
          success: false,
          editable: [],
          editAmount: 0,
          data: [],
          beats: [],
          genres: [],
          genreId: 0,
          emotion: 0
        }
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleGenreDescriptionChange = this.handleGenreDescriptionChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleDescriptionChange =  this.handleDescriptionChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleContentUpload = this.handleContentUpload.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.chooseGenre = this.chooseGenre.bind(this);
    this.submitGenre = this.submitGenre.bind(this);
    this.deleteBeat = this.deleteBeat.bind(this)

    }


 

handleGenreChange(e) {
        this.setState({...this.state, genre: e.target.value})
    }

handleGenreDescriptionChange(e) {
        this.setState({...this.state, genredescription: e.target.value})
    }
    
    
handleDescriptionChange(e) {
    this.setState({...this.state, description: e.target.value})
}



handleFileChange(e) {

  this.setState({file: e.target.files[0]})

}

handleFileUpload(e) {
  let formData = new FormData()
  formData.append('file', this.state.file)
  
  axios.post('/api/files/upload', formData)
  .then(response => { 
    alert("Uploaded")
    console.log('file', response)
  this.setState({...this.state, image: response.data.name, success: true})
  
}).catch(err => console.log(err))

}


handleContentChange(e) {
    this.setState({music: e.target.files[0]})
   } 


handleContentUpload(e) {
    let formData = new FormData()
    formData.append('file', this.state.music)
    
    axios.post('/api/files/upload', formData)
    .then(response => { 
        alert("Uploaded")
        console.log('content', response)
    this.setState({...this.state, content: response.data.name, success: true})
    
  }).catch(err => console.log(err))
  
  }

  handleAmountChange(e) {
    this.setState({...this.state, amount: e.target.value})
    }

        
        
        
    
    





  submitGenre(e) {
    e.preventDefault();
    console.log("self",this)
    axios.post('/api/genres', {
      Name: this.state.genre, 
      Description: this.state.genredescription,
    })

    .then(response => {
        alert("created")
        console.log('collection', response)
       this.setState({...this.state, genreCollection: response.data});
    
    })

    .catch(err => console.log(err))
   
    
  }

  submitForm(e) {
    e.preventDefault();
    axios.post('/api/beats', {
      Content: this.state.content, 
      Image: this.state.image, 
      Amount: this.state.amount,
      Description: this.state.description,
      genreId: this.state.genreId,
      emotion: this.state.emotion
    })

    .then(response => {
        alert("created")
        console.log('submit', response)
       this.setState({...this.state, data: response.data, beats: this.state.beats.concat(response.data)});
    
    })

    .catch(err => console.log(err))
   
    
  }


  componentDidMount(){
    axios.get('/api/beats')
        .then(response => {
            console.log('response',response)
            this.setState({...this.state, beats: response.data})
            //console.log(response)
        })
        .catch(err => console.log(err))

    axios.get('/api/genres')
        .then(response => {
            console.log('response',response)
            this.setState({...this.state, genres: response.data})
            //console.log(response)
        })
        .catch(err => console.log(err))
}

  
componentDidUpdate(_, prevState){
    if(this.state.beats.length > 0 && prevState.beats.length === 0){
        this.setState({editable: this.state.beats.reduce((beats, content) =>  
            beats.concat({des: content.description, amt: content.amount}),[])})
    } 
}

onDesChange(value, idx){
    this.setState({beats: this.state.beats.map((ed, index) => 
        ({...ed, description: index === idx ? value : ed.description}))})
}

onAmtChange(value, idx){
    this.setState({beats: this.state.beats.map((ed, index) => 
        ({...ed, amount: index === idx ? value : ed.amount}))})
}

editBeat(idx){
    axios.put('/api/beats', this.state.beats[idx])
        .then(response => {
            alert("edited")
            console.log('response',response)
            this.setState({beats: this.state.beats.map(beat => beat.id === response.id ? response : beat)})
            //console.log(response)
        })
        .catch(err => console.log(err))
}

editBeatUpload(idx) {
    let formData = new FormData()
    formData.append('file', this.state.music)
    
    axios.post('/api/files/upload', formData)
    .then(response => { 
        alert("Uploaded")
        console.log('content', response)
        this.setState({beats: this.state.beats.map((ed, index) => 
            ({...ed, content: index === idx ? response.data.name : ed.content}))})
    
  }).catch(err => console.log(err))
  
  }

  editImageUpload(idx) {
    let formData = new FormData()
    formData.append('file', this.state.file)
    
    axios.post('/api/files/upload', formData)
    .then(response => { 
        alert("Uploaded")
        console.log('content', response)
        this.setState({beats: this.state.beats.map((ed, index) => 
            ({...ed, image: index === idx ? response.data.name : ed.image}))})
    
  }).catch(err => console.log(err))
  
  }

deleteBeat(idx){
    const beatId = this.state.beats[idx]
    console.log("beat id", beatId)
    axios.delete(`/api/beats/${beatId.id}?genreId=${beatId.genreId}`)
        .then(() => {
            alert("deleted")
            this.setState({beats: this.state.beats.filter(beat => beat.id !== beatId)})
            //console.log(response)
        })
        .catch(err => console.log(err))
}

chooseGenre(value) {
    console.log("genre id",value)
    this.setState({genreId: value})
}

chooseEmotion(value) {
    console.log("emotion id",value)
    this.setState({emotion: value})
}
    render() {
        console.log('state',this.state)
        console.log(this.state.description)
        console.log(this.state.amount)
        console.log("data",this.state.beats)
        return (
            <>
                <div className="admin">
            <header>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" >
                <img src="images/wave.png" className="logo img-fluid" alt=""/>
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-toggle" aria-controls="navbarNavAltMarkup"
                        aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    
                        
                    </nav>
                </header>
                </div>

                <div className="admin-bg ">
                    <div className="centering">
                        <h2 className="center-h2">Admin Portal</h2>
                    </div>
                </div>

                <div className="container">
                <div className="row pad-contact">
                        <div className="col-md-12">
                        <div className="card" style={{ border:"none"}}>
                        <div className="card-body my-card">
                            <h2 className="send">Create Genre</h2>
                            <div className="d-flex">
                                <div style={{width:"100%"}}>
                                    <h3 className="details">Name</h3>
                                    <input  className="input-text form-control" type="text" value={this.state.genre} onChange={this.handleGenreChange}/>
                                </div>
                                <div style={{width:"100%"}}>
                                    <h3 className="details">Description</h3>
                                    <input  className="input-text form-control" type="text" value={this.state.genredescription} onChange={this.handleGenreDescriptionChange}/>
                                </div>

                            </div>
                           <div className="d-flex">
                            <button className="blog-butt center-button" onClick={this.submitGenre} style={{marginLeft: "16px"}}>Post</button> 
                            </div> 
                        </div>
                        </div>
                        </div>
                    </div>
                 
                    <div className="row pad-contact">
                        <div className="col-md-12">
                        <div className="card" style={{ border:"none"}}>
                        <div className="card-body my-card">
                            <h2 className="send">Create Beat</h2>
                            <div className="d-flex">
                                <div style={{width:"100%"}}>
                                    <h3 className="details">Content</h3>
                                    <input  className="input-text form-control" type="file" id="content" name="content" onChange={this.handleContentChange}/>
                                    <button className="btn-style content-upload"  type="button" onClick={this.handleContentUpload}>Upload</button>
                                </div>
                                <div style={{width:"100%"}}>
                                    <h3 className="details">Image</h3>
                                    <input  className="input-text form-control" type="file" id="file" name="file" onChange={this.handleFileChange}/>
                                    <button class="btn-style file-upload"  type="button" onClick={this.handleFileUpload}>Upload</button>
                                </div>

                            </div>
                            <div className="d-flex">
                            <div style={{width:"100%"}}>
                                <h3 className="details">Description</h3>
                                <input placeholder="" className="input-text form-control" value={this.state.description} onChange={this.handleDescriptionChange} required/>
                                </div> 
                                <div style={{width:"100%"}}>
                                <h3 className="details">Amount</h3>
                                <input placeholder="" className="input-text form-control" value={this.state.amount} onChange={this.handleAmountChange} required/>
                                </div>
                            </div>
                            <div className="d-flex">
                            <div style={{width:"100%"}}>
                           
                                <select value={this.state.genreId} onChange={({target: {value}}) => this.chooseGenre(value)}>
                                    <option value={0}>-- select a genre --</option>
                                    {this.state.genres.map(genre => (
                                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                                    ))}
                                </select>
                            
                              
                            </div>

                       
                            <div style={{width:"100%"}}>
                                <select value={this.state.emotion} onChange={({target: {value}}) => this.chooseEmotion(value)}>
                                    <option value={0}>-- select beat emotion --</option>
                                    <option value={1}>Happy</option>
                                    <option value={2}>Hypnotic</option>
                                    <option value={3}>Calm</option>
                                    <option value={4}>Sad</option>
                                </select>
                            </div>

                      
                         
                            </div>

                            
                            <div className="d-flex">
                            <button className="blog-butt center-button" onClick={this.submitForm} style={{marginLeft: "16px"}}>Post</button> 
                            </div> 
                        </div>
                        </div>
                        </div>
                    </div>
                    <div className="row pad-admin">
                    <h2 className="send">Edit Beat</h2>
                    <table>
                        <tr>
                            <th>Content</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Edit Details</th>
                        </tr>
                        {this.state.beats.length && this.state.beats.map((beat, idx) => (
                               <tr>
                               <td><audio controls><source src={beat.content}/></audio>
                               <br/>
                               <input  className="input-text form-control" type="file" id="content" name="content" onChange={this.handleContentChange}/>
                                    <button class="btn-style"  type="button" onClick={() => this.editBeatUpload(idx)}>Upload</button>
                               </td>

                               <td>
                                   <img className="img-responsive" width="50" src={beat.image}/>
                                   <br/>
                               <input  className="input-text form-control" type="file" id="content" name="content" onChange={this.handleFileChange}/>
                                    <button class="btn-style"  type="button" onClick={() => this.editImageUpload(idx)}>Upload</button>
                               </td>

                               <td>
                                   <input type="text" className="input-details"
                                    value={this.state.beats[idx].description} 
                                    onChange={({target : {value}}) => this.onDesChange(value, idx)}/>
                                </td>
                                <td>
                                   <input type="text" className="input-details"
                                    value={this.state.beats[idx].amount} 
                                    onChange={({target : {value}}) => this.onAmtChange(value, idx)}/>
                                </td>
                                
                               <td> <button class="btn-style edit-upload"  type="button" onClick={(e) => this.editBeat(idx)}>Edit</button>
                               <button class="btn-style edit-upload"  type="button" onClick={(e) => this.deleteBeat(idx)}>Delete</button>
                               </td>
                           </tr>
                        ))}
                    
                    </table>
                    </div>
                </div>

               <Footer/>

            </>

        )
    }

  }

