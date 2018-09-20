import React, {Component} from 'react';
import { Col } from 'react-bootstrap';

class UploadFile extends Component {
    constructor (props) {
        super(props);
        this.showImg = this.showImg.bind(this);
    }

    showImg(e) {
        let _URL = window.URL || window.webkitURL,
            currentImg = e.target.name,
            files = e.target.files,
            { props } = this;
        if (files && files[0]) {
            let img = new Image();
            img.onload = function() {
                let reader = new FileReader(),
                    imgWidth = this.width,
                    imgHeight = this.height,
                    maxImgWidth = currentImg === "littleImg" ? props.littleImgWidth : (currentImg === "largeImg") ? props.largeImgWidth : null,
                    maxImgheight = currentImg === "littleImg" ? props.littleImgHeight : (currentImg === "largeImg") ? props.largeImgHeight : null;

                reader.onload = function(event) {
                    if (imgWidth < maxImgWidth || imgHeight < maxImgheight) {
                        alert("dimensions error");
                        return
                    }
                    document.getElementById(currentImg).src = event.target.result;
                    let base64Img = event.target.result.replace(/^data:image\/jpeg;base64,+/i, '');
                    if (currentImg === "littleImg") {
                        props.setLittleImg(base64Img);
                    } else {
                        props.setLargeImg(base64Img);
                    }
                };
                reader.readAsDataURL(files[0]);
            };
            img.onerror = function() {
                alert( "not a valid file: " + files[0].type);
            };
            img.src = _URL.createObjectURL(files[0]);
        }
    }

    render() {
        return (
            <div className="visual custom-block">
                <h4>визуальный образ</h4>
                <Col md={6}>
                    <div className="img-block">
                        <img src={this.props.images && this.props.images.logo_url} id="littleImg"/>
                    </div>
                    <div>
                        <p className="upload-img">Загрузите логотип</p>
                        <label className="btn" htmlFor="my-file-selector1">
                            <input id="my-file-selector1" name="littleImg" type="file" accept=".jpg" onChange={this.showImg}/>
                            Загрузить
                        </label>
                        <p className="img-size">Минимум {this.props.littleImgWidth}х{this.props.littleImgHeight} пикс. в формате jpg
                            с использованием однотонного фона</p>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="img-block img-large">
                        <img src={this.props.images && this.props.images.banner_url} id="largeImg"/>
                    </div>
                    <div>
                        <p className="upload-img">Загрузите логотип</p>
                        <label className="btn" htmlFor="my-file-selector2">
                            <input id="my-file-selector2" name="largeImg" type="file" accept=".jpg" onChange={this.showImg}/>
                            Загрузить
                        </label>
                        <p className="img-size">Минимум {this.props.largeImgWidth}х{this.props.largeImgHeight} пикс. в формате jpg</p>
                    </div>
                </Col>
                <div className="clearfix"/>
            </div>
        );
    }
}

export default UploadFile;
