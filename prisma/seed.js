const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('⏳ Seeding database...');

  // Crear Categorías
  const categoriasData = [
    { nombre: 'Programación', descripcion: 'Cursos sobre lenguajes de programación y desarrollo', imagenUrl: null },
    { nombre: 'Diseño Gráfico', descripcion: 'Diseño digital y herramientas creativas', imagenUrl: null },
    { nombre: 'Negocios', descripcion: 'Gestión, finanzas y emprendimiento', imagenUrl: null },
    { nombre: 'Marketing Digital', descripcion: 'Publicidad, SEO, redes sociales', imagenUrl: null },
    { nombre: 'Datos e IA', descripcion: 'Análisis de datos, machine learning e inteligencia artificial', imagenUrl: null },
  ];

  const categorias = await Promise.all(
    categoriasData.map(categoria => prisma.categoria.create({ data: categoria }))
  );

  // Crear Instructores
  const instructors = await Promise.all([
    prisma.instructor.create({
      data: {
        nombre: 'Ana Torres',
        email: 'ana.torres@edu.com',
        descripcion: 'Experta en desarrollo web con más de 10 años de experiencia.',
        telefono: '555-123-4567',
        imagenUrl: null
      }
    }),
    prisma.instructor.create({
      data: {
        nombre: 'Carlos Ramírez',
        email: 'carlos.ramirez@edu.com',
        descripcion: 'Diseñador gráfico profesional, especializado en UI/UX.',
        telefono: '555-234-5678',
        imagenUrl: null
      }
    }),
    prisma.instructor.create({
      data: {
        nombre: 'Lucía Fernández',
        email: 'lucia.fernandez@edu.com',
        descripcion: 'Consultora de marketing digital y estrategia online.',
        telefono: '555-345-6789',
        imagenUrl: null
      }
    })
  ]);

  // Crear Cursos
  const ahora = new Date();
  const en60dias = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
  const en45dias = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000);
  const en90dias = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
  const en30dias = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const en75dias = new Date(Date.now() + 75 * 24 * 60 * 60 * 1000);

  await prisma.curso.create({
    data: {
      nombre: 'Introducción a JavaScript',
      descripcion: 'Aprende los fundamentos del lenguaje más popular de la web.',
      precio: 1500,
      fecha_inicio: ahora,
      fecha_fin: en60dias,
      Categoria_Curso: {
        create: [{ Categoria: { connect: { id: categorias[0].id } } }]
      },
      Instructor_Curso: {
        create: [{ Instructor: { connect: { id: instructors[0].id } } }]
      }
    }
  });

  await prisma.curso.create({
    data: {
      nombre: 'Photoshop para principiantes',
      descripcion: 'Domina las herramientas básicas de Photoshop para diseño gráfico.',
      precio: 1200,
      fecha_inicio: ahora,
      fecha_fin: en45dias,
      Categoria_Curso: {
        create: [{ Categoria: { connect: { id: categorias[1].id } } }]
      },
      Instructor_Curso: {
        create: [{ Instructor: { connect: { id: instructors[1].id } } }]
      }
    }
  });

  await prisma.curso.create({
    data: {
      nombre: 'Emprendimiento digital',
      descripcion: 'Descubre cómo lanzar tu negocio en línea desde cero.',
      precio: 2000,
      fecha_inicio: ahora,
      fecha_fin: en90dias,
      Categoria_Curso: {
        create: [{ Categoria: { connect: { id: categorias[2].id } } }]
      },
      Instructor_Curso: {
        create: [{ Instructor: { connect: { id: instructors[0].id } } }]
      }
    }
  });

  await prisma.curso.create({
    data: {
      nombre: 'SEO y posicionamiento web',
      descripcion: 'Optimiza tu sitio para motores de búsqueda y atrae tráfico orgánico.',
      precio: 1000,
      fecha_inicio: ahora,
      fecha_fin: en30dias,
      Categoria_Curso: {
        create: [{ Categoria: { connect: { id: categorias[3].id } } }]
      },
      Instructor_Curso: {
        create: [{ Instructor: { connect: { id: instructors[2].id } } }]
      }
    }
  });

  await prisma.curso.create({
    data: {
      nombre: 'Machine Learning con Python',
      descripcion: 'Aprende a entrenar modelos de predicción con scikit-learn.',
      precio: 2500,
      fecha_inicio: ahora,
      fecha_fin: en75dias,
      Categoria_Curso: {
        create: [{ Categoria: { connect: { id: categorias[4].id } } }]
      },
      Instructor_Curso: {
        create: [{ Instructor: { connect: { id: instructors[0].id } } }]
      }
    }
  });

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
