import React, { Component } from 'react';

export default class Loading extends Component {
    render() {
        const loading = this.props.loading
        return (
            <>
                {
                    loading == true ?
                        <div class="loading">
                            <span class="smooth spinner" />
                        </div>
                        : ''
                }
            </>

        );
    }
}