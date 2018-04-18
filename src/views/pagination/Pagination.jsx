import React, {Component} from 'react';

class Pagination extends Component {
    constructor (props) {
        super(props);
    }

    selectPage (number) {
        return (e) => {
            e.preventDefault();
            localStorage.setItem('pageNumber', number);
            this.props.getCertainInfos(number, this.props.arr, this.props.self);
        }
    }

    render() {
        let self = this,
            pageNumber = parseInt(localStorage.getItem('pageNumber'));
        if (!pageNumber) {
            pageNumber = 0;
        }
        return (
            <div>
                <div className="pagination-block">
                    {
                        self.props.pages.map((item, index) => {
                            return <a className={`${pageNumber === index ? "active" : ""}`}
                                      href="#" onClick={self.selectPage(index)} key={index}>{item + 1}</a>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Pagination;
