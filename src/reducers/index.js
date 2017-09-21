import * as act from '../actions';
import {List, Map} from 'immutable';
import {extendOwn, isNumber, isString} from "underscore";
// import {mouseEventNames} from '../_inc/preference';

// 초기 상태
const initialState = Map({
  receivedList: List([]),
  deletedList: List([]),
  list: List([]),
  page: Map({}),
  sortInfo: Map({}),
  scrollLeft: 0,
  scrollTop: 0,
  columns: List([]),
  colGroup: List([]),
  footSumColumns: List([]),
  bodyGrouping: List([]),
  focusedColumn: Map({}), // 그리드 바디의 포커스된 셀 정보
  selectedColumn: Map({}), // 그리드 바디의 선택된 셀 정보
  isInlineEditing: false,
  inlineEditing: Map({}),
  listIndexMap: Map({}), // tree데이터 사용시 데이터 인덱싱 맵
  headerTable: Map({}),
  leftHeaderData: Map({}),
  headerData: Map({}),
  rightHeaderData: Map({}),
  bodyRowTable: Map({}),
  leftBodyRowData: Map({}),
  bodyRowData: Map({}),
  rightBodyRowData: Map({}),
  bodyRowMap: Map({}),
  bodyGroupingTable: Map({}),
  leftBodyGroupingData: Map({}),
  bodyGroupingData: Map({}),
  rightBodyGroupingData: Map({}),
  bodyGroupingMap: Map({}),
  footSumTable: Map({}), // footSum의 출력레이아웃
  leftFootSumData: Map({}), // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 왼쪽
  footSumData: Map({}), // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 오른쪽
  options: Map({
    frozenColumnIndex: 0,
    frozenRowIndex: 0,
    showLineNumber: false,
    showRowSelector: false,
    multipleSelect: true,
    columnMinWidth: 100,
    lineNumberColumnWidth: 30,
    rowSelectorColumnWidth: 26,
    sortable: undefined,
    remoteSort: false,
    header: Map({
      display: true,
      align: false,
      columnHeight: 26,
      columnPadding: 3,
      columnBorderWidth: 1,
      selector: true
    }),
    body: Map({
      align: false,
      columnHeight: 26,
      columnPadding: 3,
      columnBorderWidth: 1,
      grouping: false,
      mergeCells: false
    }),
    page: Map({
      height: 25,
      display: true,
      statusDisplay: true,
      navigationItemCount: 5
    }),
    scroller: Map({
      size: 15,
      barMinSize: 15,
      trackPadding: 4
    }),
    columnKeys: Map({
      selected: '__selected__',
      modified: '__modified__',
      deleted: '__deleted__',
      disableSelection: '__disable_selection__'
    }),
    tree: Map({
      use: false,
      hashDigit: 8,
      indentWidth: 10,
      arrowWidth: 15,
      iconWidth: 18,
      icons: Map({
        openedArrow: '▾',
        collapsedArrow: '▸',
        groupIcon: '⊚',
        collapsedGroupIcon: '⊚',
        itemIcon: '⊙'
      }),
      columnKeys: Map({
        parentKey: "pid",
        selfKey: "id",
        collapse: "collapse",
        hidden: "hidden",
        parentHash: "__hp__",
        selfHash: "__hs__",
        children: "__children__",
        depth: "__depth__",
      })
    })
  })

});

/*
this.xvar = {
  bodyTrHeight: 0, // 한줄의 높이
  scrollContentWidth: 0, // 스크롤 될 내용물의 너비 (스크롤 될 내용물 : panel['body-scroll'] 안에 컬럼이 있는)
  scrollContentHeight: 0, // 스크롤 된 내용물의 높이
  scrollTimer: null
};
*/

// 리듀서 함수 정의
const grid = (state = initialState, action) => {
  const processor = {
    [act.INIT]: () => { // 그리드 데이터 초기화
      let columnKeys = extendOwn(state.getIn(['options', 'columnKeys']).toJS(), action.columnKeys);
      if (action.columnKeys) {
        state = state.setIn(['options', 'columnKeys'], Map(columnKeys));
      }
      let list = action.receivedList.filter(function (item) {
        if (item) {
          if (item[columnKeys.deleted]) {
            return false;
          } else {
            return true;
          }
        }
        return false;
      });

      // 정리할 state
      // headerTable
      // options.frozenColumnIndex
      // bodyRowTable
      // bodyRowMap
      // options.bodyTrHeight
      // colGroup
      // footSumColumns
      // footSumTable
      // bodyGrouping
      // bodyGroupingTable


      return state
        .set('receivedList', List(action.receivedList))
        .set('list', List(list))
        .set('page', Map(action.page));

    },
    // 필요 액션들
    // resetColGroupWidths
    // resizeGrid


    [act.SET_DATA]: () => {
      return state
        .set('receivedList', List(action.receivedList))
        .set('page', Map(action.page));
    },
    [act.UPDATE_SCROLL]: () => {
      if (isNumber(action.scrollLeft) || isString(action.scrollLeft)) {
        state = state.set('scrollLeft', action.scrollLeft);
      }
      if (isNumber(action.scrollTop) || isString(action.scrollTop)) {
        state = state.set('scrollTop', action.scrollTop);
      }

      return state;
    }
  };

  if (action.type in processor) {
    return processor[action.type]();
  } else {
    return state;
  }
};

export default grid;