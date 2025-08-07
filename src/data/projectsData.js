export const projectsData = [
  {
    id: 1,
    title: "Luxury House in Puri Kembangan",
    titleId: "Rumah Mewah di Puri Kembangan",
    description: "Renovate the house with modern classic design and adding a new floor.",
    descriptionId: "renovasi rumah dengan desain modern classic dan menambahkan lantai baru.",
    category: "residential",
    location: "Jakarta, Indonesia",
    duration: "8 months",
    image: "/src/assets/PuriKembangan.jpeg",
    status: "completed"
  },
  {
    id: 2,
    title: "Luxury House in The Zora Cluster",
    titleId: "Rumah Mewah di Cluster The Zora",
    description: "Renovate the house with modern minimalist design and adding a new floor.",
    descriptionId: "renovasi rumah dengan desain modern minimalis dan menambahkan lantai baru.",
    category: "residential",
    location: "Tangerang, Indonesia",
    duration: "6 months",
    image: "/src/assets/TheZora.jpeg",
    status: "completed"
  },
  {
    id: 3,
    title: "Business Place into Motorbike Wash.",
    titleId: "Tempat Usaha menjadi Cuci Motor",
    description: "Renovate the place into a modern motorbike wash with efficient workflow.",
    descriptionId: "Renovasi tempat usaha menjadi cuci motor dengan alur kerja yang efisien.",
    category: "business",
    location: "Jakarta, Indonesia",
    duration: "1.5 months",
    image: "/src/assets/DK2BikeWash.jpeg",
    status: "completed"
  },
  {
    id: 4,
    title: "BUMN",
    titleId: "BUMN",
    description: "Upgrading and procurement of government facilities.",
    descriptionId: "Peningkatan dan pengadaan fasilitas pemerintah.",
    category: "BUMN",
    location: "Jakarta, Indonesia",
    duration: "6 months",
    image: "/src/assets/BUMN.jpeg",
    status: "completed"
  },
  {
    id: 5,
    title: "Constructing road in Bogor",
    titleId: "Cor jalan di Bogor",
    description: "Constructing a new road in Bogor with high durability.",
    descriptionId: "Membangun jalan baru di Bogor dengan daya tahan tinggi.",
    category: "infrastructure",
    location: "Sentul, Indonesia",
    duration: "2 months",
    image: "/src/assets/CorSentul.jpeg",
    status: "completed"
  },
];

// Utility functions for project statistics
export const getProjectStats = (projects) => {
  const completedProjects = projects.filter(project => project.status === 'completed').length;
  const inProgressProjects = projects.filter(project => project.status === 'in-progress').length;
  const totalProjects = projects.length;
  const uniqueLocations = [...new Set(projects.map(project => project.location))].length;
  const categories = [...new Set(projects.map(project => project.category))].length;
  
  // Calculate total duration in months
  const totalDurationMonths = projects.reduce((total, project) => {
    const durationStr = project.duration.split(' ')[0];
    const months = parseFloat(durationStr); // Use parseFloat to handle decimals like "1.5"
    return total + months;
  }, 0);

  return {
    completedProjects,
    inProgressProjects,
    totalProjects,
    uniqueLocations,
    categories,
    totalDurationMonths
  };
};
