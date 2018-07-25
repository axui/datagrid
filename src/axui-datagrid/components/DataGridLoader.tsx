import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';

interface IProps extends IDataGridStore {}
interface IState {}

class DataGridLoader extends React.Component<IProps, IState> {
  state = {};

  render() {
    const { loading } = this.props;

    if (!loading) {
      return null;
    }

    return (
      <div className="axui-datagrid-loader">
        <div data-loader-spinner="" />
        <div data-loader-text="">Loading</div>
      </div>
    );
  }
}

export default connectStore(DataGridLoader);
