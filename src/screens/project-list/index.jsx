import { cleanObject } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-pannel"
import { useEffect, useState } from "react"
import * as qs from 'qs'

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    
    const [list, setList] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async res => {
            if(res.ok) {
                setList(await res.json())
            }
        })
    }, [param])

    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async res => {
            if(res.ok) {
                setUsers(await res.json())
            }
        })
    }, [])


    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </div>
}