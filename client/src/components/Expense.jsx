import React, {useState} from "react";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Box, IconButton, Tooltip } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function Expense({expense, description, amount, date}) { //code from mui Accordian component
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

      const localDate = new Date(date).toLocaleDateString();

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
      <Typography sx={{ color: 'text.primary' }}>{expense}</Typography>
    </AccordionSummary>
    <AccordionDetails>
    <Typography pb="15px">
       {`Amount : ${amount}`}
    </Typography>
      <Typography>
        {`Description : ${description}`}
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Tooltip title="Edit Expense" placement="left-start">
  <IconButton color="secondary"><EditIcon/></IconButton>
  </Tooltip>
  <Tooltip title="Delete Expense" placement="right-start">
  <IconButton color="secondary"><DeleteIcon/></IconButton>
  </Tooltip>
  </Box>
}

export default Expense;