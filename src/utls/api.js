import axios from "axios";

const apikey="7c0e5d80488d4c321f35183c85e295765ab7eab56a2b039e097b445a47b3f2cb85297a31ccdfda4ae49487581fdfe7fc4ca10081218885759b6cb5757e477b07e99bc8733428641fefe81d72d34b28b2d8a2bd0872dadf5a53823465cbd6181e36ddd7168a82317e2d3d47ef5f6eb4c45580a4621423c92baf974b57251c5ae5";

const params={
    headers:{
        'Authorization': `Bearer ${apikey}`,
        'Content Type': `application/json`,
    },
}

export const fetchDatafromAPI=async(url)=>{
    try {
        const {data} = await axios.get("http://localhost:1337/"+url,params)
        return data;   
    } catch (error) {
        console.log(error);
        return error;
    }
}
