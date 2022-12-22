const Header = ({title}) => {
    return (
      <h1>{title}</h1>
    )
  }
  
  const Content = ({parts}) => {
    let sum = 0
    parts.forEach(element => {
      sum += element.exercises
    });
    const total = parts.reduce((s, p) => {
      console.log('what is happening', s, p)
      return s + p.exercises
    }, 0)
    console.log("total", total);
  
    return (
      <div>
        {parts.map(part => 
          <div key={part.id} >{part.name} {part.exercises}</div>
        )}
        <b>total of {sum} exercises</b>
      </div>
    )
  }
  
  const Course = (props) => {
    const { course } = props
    console.log("course", course.name)
    return (
      <div>
        <Header title={course.name}/>
        <Content parts={course.parts}/>
      </div>
    )
  }
  
  export default Course