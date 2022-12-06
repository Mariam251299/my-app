import { Card, CardContent, Grid } from "@mui/material";
import React, { useState } from "react";
import DataTable from 'react-data-table-component';

const Step2 = ({ databases }) => {
    console.log(databases);

    const getData = (tableData) => {
        // console.log(tableData);

        return tableData.map((row, index) => {
            return {
                id: index,
                ...row
            }
        })
    }

    const getColumns = (tableData) => {

        return Object.entries(tableData[0]).map((col) => {
            // console.log(col);
            return {
                name: col[0],
                selector: row => row[col[0]],
                sortable: true,
            }
        });
    }

    return (
        <div>
            {
                databases.map(({ database, data }, index) => {
                    return (
                        <div key={index}>
                            <p className="title">{database}</p>
                            <Grid container spacing={2} columns={{ xs: 4, md: 12 }}>
                                {
                                    data.map(({ data: tableData, table_name }, index) => {
                                        // console.log(tableData)
                                        return (
                                            <Grid item xs={6} key={index}>
                                                <Card style={{minHeight: 700}}>
                                                    <CardContent>
                                                        <p className="subTitle">{table_name}</p>
                                                        <DataTable
                                                            columns={getColumns(tableData)}
                                                            data={getData(tableData)}
                                                            pagination
                                                        />
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        </div>

                    )
                })
            }
        </div>
    );
}

export default Step2;