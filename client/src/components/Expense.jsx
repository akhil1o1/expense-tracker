import React, {useState} from "react";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Box, IconButton, Tooltip, Divider } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function Expense({id, expense, description, amount, date, deleteExpense, handleEditClick }) { //component code from mui Accordian component
    const [expanded, setExpanded] = useState(false);

    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const localDate = new Date(date).toLocaleDateString("en-IN", options);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

     

    return <Box display="flex" alignItems="center" flexDirection="row" width="100%">
    <Accordion className="accordian" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1bh-content"
      id="panel1bh-header"
    >
      <Typography sx={{ width: '33%', flexShrink: 0 }}>
        {localDate}
      </Typography>
      <Typography sx={{ color: 'text.primary' }}>
      {expense}</Typography>
    </AccordionSummary>
    <Divider/>
    <AccordionDetails>
    <Typography pb="15px">
       {`Amount : ${amount}`}
    </Typography>
    <Divider/>
      <Typography pt="5px">
        {`Description : ${description}`}
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Tooltip title="Edit Expense" placement="left-start">
  <IconButton onClick={()=>handleEditClick(id)} color="secondary"><EditIcon/></IconButton>
  </Tooltip>
  <Tooltip title="Delete Expense" placement="right-start">
  <IconButton onClick={()=>deleteExpense(id)} color="secondary"><DeleteIcon/></IconButton>
  </Tooltip>
  </Box>
}

export default Expense;