import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { injectIntl } from "react-intl";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
export const Datatable = (props) => {
  let selectRowProp = {
    ...props.selectRow,
    style: { color: "#1BC5BD", fontWeight: "bold" },
    hideSelectColumn: !props.showSelectedColumnIcon,
  };
  const data = props.data;
  let className = "datatable-container";



  const sizePerPageListGenerator = () => {
    let array = []
    for (let i = 1; i < 5 ; i++) {
       if(i * 5 < data.length){
          array.push(i*5);
       }{
         array.push(data.length)
         break;
      }
    }
    console.log(array)
    return array;
  }


  const options = {
    sizePerPage: props.sizePerPage ? props.sizePerPage : 5,
    sizePerPageList: props.sizePerPage ? [ 5, 10 , 15 , 20 ,data.length] : sizePerPageListGenerator(),
  };
  const createOptions = (pageSize) => {
    return {
      page:props.activePage,
      sizePerPage: props.sizePerPage,
      totalSize :props.totalPage,
      lastPageText: '>>',
      firstPageText: '<<',
      nextPageText: '>',
      prePageText: '<',
      alwaysShowAllBtns: true,
      sizePerPageList: [ 5, 10, 15, 20 ,props.totalPage],
      showTotal: true,
      onPageChange:props.onPageChange,
      onSizePerPageChange: props.onSizePerPageChange
    }
  }
  className = props.error && className + "-has-error";
  const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      props.rowClick && props.rowClick(e, row, rowIndex);
    },
    onMouseEnter: (e, row, rowIndex) => {
      console.log(`enter on row with index: ${rowIndex}`);
    },
  };

  return (
    data && (
      <>
        <div className={className}>
          <BootstrapTable
            wrapperClasses="table-responsive"
            bordered={false}
            classes="table table-head-custom table-vertical-center overflow-hidden"
            bootstrap4
            remote={props.remote === true ? true : false}
            keyField={props.keyField ? props.keyField : "id"}
            data={data === null ? [] : data}
            columns={props.columns}
            selectRow={selectRowProp}
            pagination={
              !props.hidePagination ? props.remote === true ? paginationFactory(createOptions(props.totalPage)): paginationFactory(options) : null
            }
            filter={filterFactory()}
            defaultSorted={props.defaultSorted}
            key={props.key ? props.key : props.data}
            filterPosition="top"
            cellEdit={props.cellEdit}
            rowStyle={props.rowStyle}
            expandRow={props.expandRow}
            rowEvents={tableRowEvents}
          />
        </div>
        {props.error && <div className="invalid-feedback"> {props.error}</div>}
      </>
    )
  );
};

export default injectIntl(Datatable);
