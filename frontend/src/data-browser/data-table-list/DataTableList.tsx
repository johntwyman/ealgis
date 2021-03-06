import { GridList, GridTile } from "material-ui/GridList"
import IconButton from "material-ui/IconButton"
import { ListItem } from "material-ui/List"
import { yellow500 } from "material-ui/styles/colors"
import ToggleStar from "material-ui/svg-icons/toggle/star"
import ToggleStarBorder from "material-ui/svg-icons/toggle/star-border"
import * as React from "react"
import { ISchemaInfo, ITable } from "../../redux/modules/ealgis";

// Silence "TS2339: Property 'onClick' does not exist'" warnings
class ClickableGridTile extends React.Component<any, any> {
    render() {
        return <GridTile {...this.props} />
    }
}

// Silence "TS2339: Property 'onClick' does not exist'" warnings
class ClickableIconButton extends React.Component<any, any> {
    render() {
        return <IconButton {...this.props} />
    }
}

export interface IProps {
    schemas: ISchemaInfo
    tables: Array<ITable>
    favouriteTables: Array<Partial<ITable>>
    onClickTable: Function
    onFavouriteTable?: Function
}

export class DataTableList extends React.PureComponent<IProps, {}> {
    getTableName(table: ITable) {
        if (table["metadata_json"]["series"] !== null) {
            return `${table["metadata_json"]["type"]} - ${table["metadata_json"]["series"]} (${table["metadata_json"][
                "family"
            ].toUpperCase()})`
        } else {
            return `${table["metadata_json"]["type"]} (${table["metadata_json"]["family"].toUpperCase()})`
        }
    }
    render() {
        const { schemas, tables, favouriteTables, onClickTable, onFavouriteTable } = this.props
        const favouriteTablesUIDs: any = favouriteTables.map(x => `${x.schema_name}.${x.id}`)

        return (
            <GridList cols={6} cellHeight={"auto"} padding={0}>
                {tables.map((table: ITable, idx: number) => {
                    return (
                        <ClickableGridTile key={idx} cols={2} onClick={() => onClickTable(table)}>
                            <ListItem
                                primaryText={this.getTableName(table)}
                                secondaryText={
                                    <span>
                                        {`${table["metadata_json"]["kind"]}`}
                                        <br />
                                        {`${schemas[table.schema_name].name}, ${schemas[table.schema_name].family}`}
                                    </span>
                                }
                                secondaryTextLines={2}
                                rightIconButton={
                                    onFavouriteTable !== undefined ? (
                                        <ClickableIconButton
                                            tooltip={"Favourite this table to easily find it again later"}
                                            tooltipPosition={"top-right"}
                                            onClick={() => onFavouriteTable(table)}
                                        >
                                            {favouriteTablesUIDs.includes(`${table.schema_name}.${table.id}`) ? (
                                                <ToggleStar color={yellow500} />
                                            ) : (
                                                <ToggleStarBorder />
                                            )}
                                        </ClickableIconButton>
                                    ) : (
                                        undefined
                                    )
                                }
                            />
                        </ClickableGridTile>
                    )
                })}
            </GridList>
        )
    }
}

export default DataTableList
