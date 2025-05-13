import { Box } from "../ui/container/Box";

export function ResumeTag({name,value}) {
    return ( 
        <Box w={'70'} h={'25'} padding="p-6" margin="m-0 mr-5" className="border border-gray-300 rounded-lg shadow-xs">
            <div className="text-black">
                <p className="text-gray-500 font-bold mb-1 text-[15px]">{name}</p>
                <p className="text-[20px] font-bold">{value}</p>
            </div>
        </Box>
     )
}
