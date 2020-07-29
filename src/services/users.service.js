import jsonData from './data.json'

export default async function getUsers(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(jsonData)
        }, 100);
    })
}