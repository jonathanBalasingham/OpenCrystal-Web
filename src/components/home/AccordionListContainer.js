import {useSelector} from "react-redux";
import {getActiveAccordion} from "../../features/home/homeSlice";
import {getAccessToken} from "../../features/auth/authSlice";
import {useState} from "react";

/*
export const AccordionListContainer = () => {
    const activeAccordion = useSelector(getActiveAccordion)
    const token = useSelector(getAccessToken)
    const [recentData, setRecentData] = useState(null)
    const [recentLoaded, setRecentLoaded] = useState(true)


    const loadRecent = () => {
        if (!recentLoaded) {
            fetch(`/api/search/recent`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer:${token}`,
                },
            })
                .then(data => data.json())
                .then((d) => {
                    setLoading(false)
                    setRecentData(d.data)
                    setRecentLoaded(true)
                })
        }
    }

    return (
        <div>

        </div>
    )
}


 */