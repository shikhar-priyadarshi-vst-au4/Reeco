import React, { useState } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHeader = styled.thead`
  background-color: #f2f2f2;
  font-weight: bold;
  & > tr{
    border: 1px solid #ccc;
    border-radius: 8px;
  }
`;

const TableHeaderCell = styled.th`
  padding: 8px;
  text-align: left;
  cursor: pointer;
`;

const TableRow = styled.tr`
  background-color: #fff;
  border-bottom: 1px solid #ccc;
`;

const TableCell = styled.td`
  width: ${props => props.width ? props.width : 'auto'};
  min-width: ${props => props.minWidth ? props.minWidth : 'auto'};
  max-width: ${props => props.maxWidth ? props.maxWidth : 'auto'};
  padding: ${props => props.padding ? props.padding : '8px'};
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
`;

const DataTable = ({ columns, data }) => {
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedData = data.sort((a, b) => {
    const keyA = a[sortKey];
    const keyB = b[sortKey];

    if (sortOrder === 'asc') {
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    } else {
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    }
  });

  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell
                key={column.key}
                onClick={() => handleSort(column.key)}
              >
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <tbody>
          {sortedData.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell 
                  key={column.key}
                  width={column.width}
                  minWidth={column.minWidth}
                  maxWidth={column.maxWidth}
                  padding={column.padding}
                  textAlign={column.textAlign}
                  style={column.style}>
                    {'render' in column ? column.render(row) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default DataTable;
