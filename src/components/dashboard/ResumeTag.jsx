import { Box } from "../ui/container/Box";

export function ResumeTag({name="Criteria",value='Garlfield'}) {
    return ( 
        <Box w={'75'} h={'25'} padding="p-5" className="border border-gray-300 rounded-lg shadow-xs">
            <div className="text-black">
                <p className="text-gray-500 mb-1">{name}</p>
                <p className="text-[20px] font-bold">{value}</p>
            </div>
        </Box>
     )
}
