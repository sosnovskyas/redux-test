'use strict';

import React, {PropTypes, Component} from 'react'

export default class Page extends Component {

  onYearBtnClick(e) {
    // this.props.setYear(+e.target.innerText)
    this.props.getPhotos(+e.target.innerText)
  }

  render() {

    const {year, photos, fetching} = this.props;

    // Строка
    // ::this.onYearBtnClick === this.onYearBtnClick.bind(this),
    // и нужна так как React с версии 0.14.x
    // не привязывает this к компоненту.
    //
    // Использование двойного двоеточия - это возможность ES7 (experimental),
    // которая доступна в babel с настройкой stage=0
    return (
      <div>
        <p>
          <button onClick={::this.onYearBtnClick}>2016</button>
          <button onClick={::this.onYearBtnClick}>2015</button>
          <button onClick={::this.onYearBtnClick}>2014</button>
        </p>
        <h3>
          {year} год
        </h3>
        {/* условное отображение по факту загрузки */}
        {
          fetching ?
            <p>Загрузка...</p>
            :
            <p>У тебя {photos.length} фото.</p>
        }
      </div>
    )
  }
}

Page.propTypes = {
  year: PropTypes.number.isRequired,
  photos: PropTypes.array.isRequired,
  // setYear: PropTypes.func.isRequired
  getPhotos: PropTypes.func.isRequired
};
