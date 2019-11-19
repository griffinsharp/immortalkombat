import React, { Component } from 'react'

export default class Controller extends Component {
    render() {
        return (
            <div>
                <div className='cable'></div>
                <div className='controller'>
                    <div className='centerBlue'>
                        <div className='centerLeft'></div>
                        <div className='centerRight'></div>
                    </div>
                    <div className='centerStart'>
                        <div className='SLeft'></div>
                        <div className='SRight'></div>
                    </div>
                    <div className='centerSelect'>
                        <div className='SLeft'></div>
                        <div className='SRight'></div>
                    </div>

                    <div className='controllerLeft'>
                        <div className='circle'></div>
                        <div className='crossCenter'>
                            
                            
                            <div className='crossLeft' onClick={() => console.log(' hello')}></div>
                            <div className='crossRight'></div>
                            <div className='crossCircle'></div>
                        </div>
                    </div>
                    <div className='controllerRight'>
                        <div className='backButton1Center'>
                            <div className= 'cornerLeft1'></div>
                            <div className= 'cornerRight1'></div>
                        </div>
                        {/* <div className='backButton2Center'>
                            <div className= 'cornerLeft2'></div>
                            <div className= 'cornerRight2'></div>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}
