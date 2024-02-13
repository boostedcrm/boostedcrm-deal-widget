export const generateProjectsData = () => {
    const projects = [];
    for (let i = 1; i <= 4; i++) {
      projects.push({
        name: `Project ${i}`,
        link: `/project-${i}`,
        status: i % 2 === 0 ? "Completed" : "In Progress",
        completion: Math.floor(Math.random() * 101), // Random completion percentage
        milestones: Math.floor(Math.random() * 10), // Random number of milestones
        tasks: Math.floor(Math.random() * 20) // Random number of tasks
      });
    }
    return projects;
  };
  
  export const generateInvoicesData = () => {
    const invoices = [];
    const statuses = ["Approved", "Paid"];
    for (let i = 1; i <= 4; i++) {
      invoices.push({
        number: `INV-00108${i}`,
        link: `/invoice/INV-00108${i}`,
        status: statuses[Math.floor(Math.random() * statuses.length)], // Random status
        invoiceDate: `2024-02-${i < 10 ? "0" + i : i}`,
        dueDate: `2024-03-${i < 10 ? "0" + i : i}`,
        amount: `$${(Math.random() * 10000).toFixed(2)}`,
        balanceDue: `$${(Math.random() * 5000).toFixed(2)}`
      });
    }
    return invoices;
  };
  