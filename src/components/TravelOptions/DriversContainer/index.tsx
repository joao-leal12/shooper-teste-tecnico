import { List, Box } from "@mui/material"

import { Driver } from "../../Driver"

export const DriversContainer  = () => {
  return (
    <Box
    sx={{
      maxHeight: "400px",
      overflowY: "auto",
      border: "1px solid #03AA77",
      borderRadius: "8px",
      padding: "0.5rem",
    
    }}
  >
      <List> 
        <Driver/>
      </List>
    </Box>
  )
}
