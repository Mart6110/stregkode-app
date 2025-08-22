import {
    Box,
    Table,
} from '@chakra-ui/react'
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    compareItems,
    rankItem,
} from '@tanstack/match-sorter-utils'
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'

// Define a custom fuzzy filter function that will apply ranking info to rows
const fuzzyFilter = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
        itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}

// Define a custom fuzzy sort function that will sort by rank if the row has ranking information
const fuzzySort = (rowA, rowB, columnId) => {
    let dir = 0

    // Only sort by rank if the column has ranking information
    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(
            rowA.columnFiltersMeta[columnId]?.itemRank,
            rowB.columnFiltersMeta[columnId]?.itemRank
        )
    }

    // Provide an alphanumeric fallback for when the item ranks are equal
    return dir === 0 ? rowA.getValue(columnId).localeCompare(rowB.getValue(columnId)) : dir
}

export function InventoryTable({ data, columns, globalFilter, setGlobalFilter, enableFiltering = true, enableSorting = true }) {
    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter, // define as a filter function that can be used in column definitions
        },
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: 'fuzzy', // apply fuzzy filter to the global filter
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableGlobalFilter: enableFiltering,
        enableSorting: enableSorting,
    })

    return (
        <Table.Root striped size="md">
            <Table.Header>
                {table.getHeaderGroups().map(headerGroup => (
                    <Table.Row key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <Table.ColumnHeader
                                key={header.id}
                                cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                                onClick={header.column.getToggleSortingHandler()}
                                userSelect="none"
                            >
                                <Box display="flex" alignItems="center">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    {header.column.getCanSort() && (
                                        <Box ml={2}>
                                            <FontAwesomeIcon
                                                icon={
                                                    header.column.getIsSorted() === 'asc'
                                                        ? faSortUp
                                                        : header.column.getIsSorted() === 'desc'
                                                            ? faSortDown
                                                            : faSort
                                                }
                                                size="sm"
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </Table.ColumnHeader>
                        ))}
                    </Table.Row>
                ))}
            </Table.Header>
            <Table.Body>
                {table.getRowModel().rows.map(row => (
                    <Table.Row key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <Table.Cell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}
