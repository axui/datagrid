import * as React from 'react';
import styled from 'styled-components';
import { Wrapper, Segment } from 'components';
import { DataGrid, IDataGrid } from 'axui-datagrid';

const MyBox = styled.div`
  position: relative;
  background: #eee;

  .resizer {
    position: absolute;
    right: -12px;
    bottom: -12px;
    width: 15px;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
    transform: rotate(45deg);
    cursor: se-resize;
    user-select: none;
  }
`;

class Etc extends React.Component<any, any> {
  state = {
    boxWidth: 600,
    boxHeight: 300,
  };

  containerRef: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.containerRef = React.createRef();
  }

  render() {
    const { boxWidth, boxHeight } = this.state;

    const grid = {
      columns: [
        {
          autoIncrement: true,
          displaySize: 5,
          index: 0,
          key: '0',
          label: 'city_id',
          name: 'city_id',
          nullable: false,
          type: 'SMALLINT UNSIGNED',
          width: 120,
        },
        {
          autoIncrement: false,
          displaySize: 50,
          index: 1,
          key: '1',
          label: 'city',
          name: 'city',
          nullable: false,
          type: 'VARCHAR',
          width: 120,
          formatter: (param: IDataGrid.IFormatterData) => {
            if (typeof param.value === 'string') {
              return param.value;
            } else {
              return param.value.v;
            }
          },
        },
      ],
      data: [
        { value: ['A', { v: 'TEST' }] },
        { value: ['A', 'B', 'C<b>a</b>'] },
        { value: ['A', 'B', 'C<b>a</b>'] },
        { value: ['A', 'B', 'C<b>a</b>'] },
        { value: ['A', 'B', 'C<b>a</b>'] },
        { value: ['A', 'B', 'C<b>a</b>'] },
        { value: ['A', 'B', 'C<b>a</b>'] },
        { value: ['A', 'B', 'C<b>a</b>'] },
        { value: ['A', 'B', 'C<b>a</b>'] },
        { value: ['A', 'B', 'C<b>a</b>'] },
        { value: ['A', 'B', 'C<b>a</b>'] },
      ],
    };

    return (
      <Wrapper>
        <Segment padded>
          <h1>Etc</h1>
          <MyBox
            style={{
              width: boxWidth,
              height: boxHeight,
              border: '1px solid #ccc',
            }}
            ref={this.containerRef}
          >
            <DataGrid
              width={this.state.boxWidth - 2}
              height={this.state.boxHeight - 2}
              style={{ fontSize: '12px' }}
              columns={grid.columns}
              data={grid.data}
              dataLength={grid.data.length}
              options={{
                lineNumberColumnWidth: 50,
                lineNumberStartAt: 1000,
                scroller: {
                  theme: 'solid',
                  horizontalScrollerWidth: 50,
                  padding: 2,
                  width: 9,
                  height: 9,
                },
                disableClipboard: true,
              }}
              status={<div>{`Total Record ${grid.data.length}`}</div>}
              onError={(err, evt) => {
                console.log(err);
              }}
            />
          </MyBox>
        </Segment>
      </Wrapper>
    );
  }
}

export default Etc;
