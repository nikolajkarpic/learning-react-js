import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHander = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
            });
        }

        componentWillUnmount() {
            console.log('will unoumt', this.responseInterceptor, this.requestInterceptor);
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.request.eject(this.responseInterceptor);

        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        };
    };

}

export default withErrorHander;