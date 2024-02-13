import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Link, LinearProgress } from "@mui/material";
import { generateProjectsData } from "./generateData";

const data = generateProjectsData();

const ProjectTable = ({ }) => {
  return (
    <div>
            <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell>Project Status</TableCell>
            <TableCell>Project Completion</TableCell>
            <TableCell>Milestones</TableCell>
            <TableCell>Tasks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((project, index) => (
            <TableRow key={index}>
              <TableCell>
                <Link href={project.link}>{project.name}</Link>
              </TableCell>
              <TableCell>
                <Chip label={project.status} color={project.status === 'Completed' ? 'primary' : 'default'} />
              </TableCell>
              <TableCell>
                <LinearProgress variant="determinate" value={project.completion} />
              </TableCell>
              <TableCell>{project.milestones}</TableCell>
              <TableCell>{project.tasks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default ProjectTable;
