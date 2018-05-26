import React from 'react'

// Material UI
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

// Helpers
import {
  extractFirebaseDBObject as extract
} from '../../../helpers'

// Relative components
import ManagementCell from './ManagementCell'

// UI
import Img from '../../ui/Img'

const getTableCellContent = (entry, name, columns) => {
  const typeOfKey = columns.filter(({ name: _name }) => (
    name === _name
  ))[0].type

  if (typeOfKey === 'id')
    return entry[name]

  if (typeOfKey === 'string')
    return entry[name]

  if (typeOfKey === 'image')
    return <Img src={entry[name]} />

  if (typeOfKey === 'boolean')
    return entry[name].toString()

  if (typeOfKey === 'number')
    return entry[name]
}

export default ({
  columns,
  data,
  change,
  remove,
  isLoading,
}) => (
  <Table>
    <TableHead>
      <TableRow>
        {columns.map(({ name }, i) => (
          <TableCell key={i}>{name}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {extract(data).map((entry, i) => (
        <TableRow key={i}>
          {columns.map(({ name }, i) => (
            <TableCell key={i}>
              {getTableCellContent(entry, name, columns)}
            </TableCell>
          ))}
          <TableCell>
            <ManagementCell
              id={entry.id}
              change={change}
              remove={remove}
              isLoading={isLoading} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)