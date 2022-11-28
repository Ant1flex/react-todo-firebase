import react, { useState, useEffect } from "react"

export default function TaskDescription({ todo, onClose, onRemind }) {
    const [remindDate, setremindDate] = useState(todo.date)

    useEffect(() => {
        setremindDate(todo.date)
    }, [todo])

    function handleChange(event) {
        setremindDate(event.target.value)
    }

    function handleRemind() {
        onRemind(todo.id, { date: remindDate })
        console.log(remindDate)
    }

    return (
        <div className="TaskDescription">
            <div className="DescHeader">
                <h1>Task details</h1>
                <button type='button' className='RemClBtn' onClick={onClose}>✖</button>
            </div>
            <div className="DescInfo">
                <div className="DescTitle">{todo.title}</div>
                {/* <input
                    className="InputTask"
                    type='text'
                    value={todo.title}
                    onChange={() => { }}
                    style={{ width: '100%' }}
                ></input> */}
                {todo.completed &&
                    <div className="DescStatus">
                        Status: {todo.completed ? 'Done' : 'Not Done'}
                    </div>
                }

                {todo.steps && todo.steps.length > 0 &&
                    <div>
                        <div>
                            <div>Steps: </div>
                            <ul className='StepListItems'>
                                {todo.steps.map((step, index) =>
                                    <li className='Step' key={index}>
                                        <label className="ChckbxWrapper">
                                            <input type='checkbox' className='Chckbx' />
                                            <label className="ChckbxCustom"></label>
                                            {step}
                                        </label>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div>
                            <input
                                className="InputTask"
                                type='text'
                                placeholder=' New step... '
                                value={''}
                                onChange={() => { }}
                                style={{ width: '100%' }}
                            ></input>
                        </div>
                    </div>
                }

                {!todo.completed &&
                    <div className="DescReminder">
                        <div>Remind me at:</div>
                        <div className="DescReminderForm">
                            <input
                                className="InputTask"
                                type='datetime-local'
                                value={
                                    remindDate
                                }
                                onChange={handleChange}
                                style={{ width: '100%' }}
                            ></input>
                            <button type='button' className='RemindBtn' onClick={handleRemind} title='Set Remind'></button>
                            {/* <input
                                className="InputTask"
                                type='text'
                                value={
                                    reminder.getHours() + ':' +
                                    reminder.getMinutes()
                                }
                                onChange={() => { }}
                                style={{ width: '100%' }}
                            ></input>
                            <input
                                className="InputTask"
                                type='text'
                                value={
                                    reminder.getDate() + '.' +
                                    reminder.getMonth() + '.' +
                                    reminder.getFullYear()
                                }
                                onChange={() => { }}
                                style={{ width: '100%' }}
                            ></input> */}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}