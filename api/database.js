import * as firebase from "firebase";
import moment from 'moment';
var _ = require('lodash');

class Database {

    static listenForExercises() {
        let ref = firebase.database().ref().child('exercises');
        let exercises = [];
        ref.on('value', (snap) => {
            snap.forEach((child) => {
                exercises.push({
                name: child.val().name,
                muscles: child.val().muscles,
                type: child.val().type,
                photo: child.val().photo,
                video: child.val().video,
                checked: child.val().checked,
                _key: child.key
                });
            });
           return exercises;
        });
         
    }

        static listenForDetails(callback) {
        // let details = [];
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/details";
         firebase.database().ref(path).on('value', (snap) => {
             details = snap.val()
            // details.push({
            //     height: snap.val().height,
            //     weight: snap.val().weight,
            // });
        
           callback(details)
        });
         
    }

    static listeningForLogs(currentDate, callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/workoutLogs";
        let logsRec = [];
        let currDate = currentDate;
        firebase.database().ref(path).on('value', (snap) => {
            let logs = snap.val();
            Object.keys(logs).forEach((date) => {
                Object.keys(logs[date]).forEach((index) => {
                    
                    if (index.length <= 3 && moment(logs[date].workoutCompleted).format('MM-DD-YY') === currDate) 
                    {
                        logsRec.push(logs[date][index]);
                    }
                })
                
                               
            })
            callback(logsRec)
        }, (e) => {console.log(e)})
    }

    

    static listeningForWeekStats(currentWeek, callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/workoutLogs";
        let logsRec = [];
        firebase.database().ref(path).on('value', (snap) => {
            let logs = snap.val();
            let weekTotalExercises = [];
            let customExercises = [];
            let weekLogDates = Object.keys(logs).filter((date) => {
                return ( moment(date).format('W') == currentWeek )
            })
            // Total Weight Per Week
            let totalWeight = []
            weekLogDates.map((day) => {
                weekTotalExercises.push(logs[day].length)
                logs[day].map((exercises) => {
                if(Array.isArray(exercises)){
                    weekTotalExercises.push(exercises.length)
                    
                    exercises.map((exercise) => {
                        if(Array.isArray(exercise.weight)){
                        exercise.weight.map((weight) =>{
                        totalWeight.push(parseInt(weight))
                    })} else {totalWeight.push(parseInt(exercise.weight))}
                    }) 
                } else {
                    customExercises.push(1)
                    totalWeight.push(parseInt(exercises.weight))
                }
            }) 
            })
            weekTotalExercises = _.sum(weekTotalExercises)
            customExercise = customExercises.length
            let weekTotalWorkouts = weekLogDates.length
            weekLogDates.forEach((date) => {
                logsRec.push([
                    ...logs[date],
                    date,
                ]);
            
            })
          callback(logsRec, totalWeight, weekTotalWorkouts, weekTotalExercises, customExercise)
        }, (e) => {console.log(e)})
    }

    static DiaryStats(callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/workoutLogs";
        let logs = []
        firebase.database().ref(path).on('value', (snap) => {
            let logs = snap.val()
            let totalExercises = []
            let totalWeight = []
            let allDays = _.drop(Object.keys(logs))
            allDays.map((day) => {
                
                totalExercises.push(logs[day].length)
                logs[day].map((exercises) => {
                if(Array.isArray(exercises)){
                    exercises.map((exercise) => {
                        if(Array.isArray(exercise.weight)){
                        exercise.weight.map((weight) =>{
                        totalWeight.push(parseInt(weight))
                    })} else {totalWeight.push(parseInt(exercise.weight))}
                    })  
                } else {
                    totalExercises.push(1)
                    totalWeight.push(parseInt(exercises.weight))
                }})
            })
            let maxWeight = _.max(totalWeight)
            totalExercises = _.sum(totalExercises)
            let totalWorkouts = Object.keys(logs).length
            finalWeight = _.sum(totalWeight)
          callback(logs, finalWeight, totalWorkouts, totalExercises, maxWeight)
        }, (e) => {console.log(e)})
    }

    static TestProfileStats(callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/workoutLogs";
        let logsRec = [];
        firebase.database().ref(path).on('value', (snap) => {
            let logs = snap.val();
             Object.keys(logs).forEach((date) => {
                 logsRec.push(logs[date].length)        
             })
          callback(logsRec)
        }, (e) => {console.log(e)})
    }
    
    static saveExerciseSequence(exercises){
            let uid = firebase.auth().currentUser.uid;
            let path = "/user/" + uid + "/ownProgram/exerciseSequence";
            Object.keys(exercises).forEach((day) => {
                let x = day;
                firebase.database().ref(path).child('exercises').update({
                    [day]: exercises[day]
                })
            })
            firebase.database().ref(path).update({
                currentExerciseIndex: 0,
                currentWorkoutDay: 1,
                currentWeek: 1,
            })
    }
    static saveDaySequence(exercises, day) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/ownProgram/exerciseSequence";
        firebase.database().ref(path).child('exercises').update({
                    [day]: exercises
        })
    }
    static getOwnExercises(callback) {
            let uid = firebase.auth().currentUser.uid;
            let exercises = firebase.database().ref().child('user').child(uid).child('ownProgram').child('exerciseSequence').once('value', (snap) => {
                let exercises = snap.val().exercises;
                callback(snap.val().exercises);
            });

    }

    static getUserProgram(callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/ownProgram";
        firebase.database().ref(path).on('value', (snap) => {
            let programName = "";
            if (snap.val()) {
                programName = snap.val().programName
            }
            callback(programName);
    })
 
    }

    static getUserProgramAll(callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/ownProgram";
        
        firebase.database().ref(path).on('value', (snap) => {
            let program = "";
            if (snap.val()) {
                program = snap.val()
                program._key = snap.val().programName
            }
            callback(program);
    })
 
    }


static getUserProgramName(callback) {
        (async () => {
            let uid = await firebase.auth().currentUser.uid;
            let path = "/user/" + uid + "/ownProgram";
        
                firebase.database().ref(path).on('value', (snap) => {
                    let programName = "";
                    if (snap.val()) {
                        programName = snap.val().programRealName
                    }
                    callback(programName);
            })
        })();
        

}

 static userHasProgram(callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/ownProgram";
        
        firebase.database().ref(path).on('value', (snap) => {
            let hasProgram = false;
            if (snap.val()) {
                hasProgram = snap.val().hasProgram
            }
            callback(hasProgram);
    })
 }
    static enrollIntoProgram(passedProgram) {
            let uid = firebase.auth().currentUser.uid;
            let path = "/user/" + uid + "/ownProgram";
           
            firebase.database().ref(path).update({
                programName: passedProgram._key,
                programRealName: passedProgram.name,
                gender: passedProgram.gender,
                days: passedProgram.days,
                day1: passedProgram.day1 || '',
                day2: passedProgram.day2 || '',
                day3: passedProgram.day3 || '',
                day4: passedProgram.day4 || '',
                day5: passedProgram.day5 || '',
                day6: passedProgram.day6 || '',
                hasProgram: true,

            })
    }

    static enrollIntoCustomProgram(passedProgram) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/ownProgram";
       
        firebase.database().ref(path).update({
            programName: passedProgram._key,
            programRealName: passedProgram.name,
            gender: passedProgram.gender,
            days: passedProgram.days,
            day1: passedProgram.day1 || '',
            day2: passedProgram.day2 || '',
            day3: passedProgram.day3 || '',
            day4: passedProgram.day4 || '',
            day5: passedProgram.day5 || '',
            day6: passedProgram.day6 || '',
            hasProgram: true,

        })
}



    static leaveProgram() {
            let uid = firebase.auth().currentUser.uid;
            let path = "/user/" + uid + "/ownProgram";
            firebase.database().ref(path).set({
                programName: ''
            })
    }
    
    static getCurrentExerciseIndex(callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/ownProgram/exerciseSequence/';

        firebase.database().ref(path).once('value', (snap) => {
            let index = snap.val().currentExerciseIndex;
            callback(index);
        })
    }
    static getCurrentWorkoutDay(callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/ownProgram/exerciseSequence/';
        firebase.database().ref(path).once('value', (snap) => {
            let day = snap.val().currentWorkoutDay;
            callback(day);
        })
    }
    static getCurrentWorkoutDaysNumber(callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/ownProgram/';
        firebase.database().ref(path).on('value', (snap) => {
            let days = snap.val().days;
            callback(days);
        })
    }
    static getCurrentWeeksNumber(callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/ownProgram/exerciseSequence/';
        firebase.database().ref(path).once('value', (snap) => {
            let weeks = snap.val().currentWeek;
            callback(weeks);
        })
    }
    static getLastWorkoutDate(callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/statistics/';
        firebase.database().ref(path).on('value', (snap) => {
        let date = snap.val().lastWorkoutDate;
        callback(date);
        })

        
    }
    static finishWorkout(){
        let dayNumber, days, weeks;
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/statistics';
        firebase.database().ref(path).update({
            lastWorkoutDate: moment().format('MM-DD-YY')
        });
        this.getCurrentWorkoutDay((day) => {dayNumber = day})
        this.getCurrentWorkoutDaysNumber((days) => {days})
        this.emptyWorkout(dayNumber, days);    
    }

    static emptyWorkout(dayNumber, place){
        let uid = firebase.auth().currentUser.uid;
        let days, weeks;
        console.log(weeks)
        let path = '/user/' + uid + '/ownProgram/exerciseSequence';
        let path2 = '/user/' + uid + '/ownProgram/';
        firebase.database().ref(path2).once('value').then((snap) => {
            days = snap.val().days;
        })
        firebase.database().ref(path).once('value').then((snap) => {
            weeks = snap.val().currentWeek;
        })
        if (dayNumber === days) {
            firebase.database().ref(path).update({
            currentExerciseIndex: 0,
            currentWorkoutDay: 1,
            currentWeek: weeks + 1
        })}
        else {
            firebase.database().ref(path).update({
            currentExerciseIndex: 0,
            currentWorkoutDay: dayNumber + 1
        })}
        
    }
    
    static pushWorkoutLog(log){
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/workoutLogs/' + moment().format("YYYY-MM-DD");
        let totalWeight = 0;
        log.forEach((logItem) => {
            totalWeight+=parseInt(logItem.weight)
        })

        firebase.database().ref(path).once('value', (snap) => {
            let logs = snap.val();
            if (logs === null) {logs = []}
        logs.push({...log})
            firebase.database().ref(path).set(logs)
        });
        //Test End
    }

    static rateWorkout(rate){
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/details/';
        firebase.database().ref(path).once('value').then( (snap) => {
            let currentRate = snap.val().difficultyRate;
            let newRate = currentRate + rate;
            if (newRate >= 5) {
                firebase.database().ref(path).update({
                    level: snap.val().level + 1,
                    difficultyRate: 0
                })
            }
            else {
                firebase.database().ref(path).update({
                    difficultyRate: newRate
                })
            }
        })

    }

    

    static setWorkoutDays(days) {
let uid = firebase.auth().currentUser.uid
        let path = "/user/" + uid + "/ownProgram/weekDays";
        firebase.database().ref(path).set(days)
    }
    
    static getWorkoutDays(callback) {
        let uid = firebase.auth().currentUser.uid
        let path = "/user/" + uid + "/ownProgram/weekDays";
        firebase.database().ref(path).once('value', (snap) => {
            let days = snap.val();
            callback(days);
        }, (e) => {console.log(e)})
    }

        static addUserMadeProgram(name, days, muscles, level, gender, duration) {
        let uid = firebase.auth().currentUser.uid
        let path = "/userPrograms/";
        function toObject(arr) {
            var day = {};
            for (var i = 1; i < arr.length; ++i)
            day["day"+i] = arr[i];
            return day;
        }
        let dailyMuscle = toObject(muscles)
        firebase.database().ref(path).push({
            days: days,
            name: name,
            level,
            gender,
            totalDays: duration,
            ...dailyMuscle
        })
    }

    static showNextExercise(ownExercise) {
        let uid = firebase.auth().currentUser.uid
        if (ownExercise) {
            firebase.database().ref('/user/' + uid + '/ownProgram/exerciseSequence').transaction( (index) => {
                if (index) {
                    index.currentExerciseIndex ++;
                }
                return index;
            });
        }
    }

    static addExerciseStats(id, sets, reps, weight, ownExercise) {
        let uid = firebase.auth().currentUser.uid
        let path = "/user/" + uid + "/statistics";
        let path2 = "/user/" + uid + "/workoutLogs/" + moment().format("YYYY-MM-DD")
        firebase.database().ref(path2).once('value', (snap) => {
            let logs = snap.val();
            if (logs === null) {logs = []}
        logs.push({
            name: id,
            weight,
            sets,
            reps,
            own: true
            })
            firebase.database().ref(path2).set(logs)
        });
        firebase.database().ref(path).transaction( (statistics) => {
            if (statistics) {
                statistics.exercisesDone++;
            }
            return statistics;
        });

        if (ownExercise) {
            firebase.database().ref('/user/' + uid + '/ownProgram/exerciseSequence').transaction( (index) => {
                if (index) {
                    index.currentExerciseIndex ++;
                }
                return index;
            });
        }
    }

//Not In use Anymore 
    static listeningForCustomLogs(callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/exercisesLogs";
        firebase.database().ref(path).on('value', (snap) => {
            let logs = snap.val();
            let CustomLogs = [];
            if (logs !== null) {
            Object.keys(logs).forEach((date) => {
                CustomLogs.push(logs[date])                
            })
            }
            callback(logs);
        }, (e) => {console.log(e)})
        
        
    }
// ------- 
    static updateProgram(newMuscles) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/ownProgram";
        firebase.database().ref(path).update({
            day1: newMuscles
        });
    }

    static getUIDasync(callback) {
            firebase.auth().onAuthStateChanged((user) => {
                callback(user.uid);
            })
    }

    static enrollIntoProgram(passedProgram) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/ownProgram";
       
        firebase.database().ref(path).update({
            programName: passedProgram._key,
            programRealName: passedProgram.name,
            gender: passedProgram.gender,
            days: passedProgram.days,
            day1: passedProgram.day1 || '',
            day2: passedProgram.day2 || '',
            day3: passedProgram.day3 || '',
            day4: passedProgram.day4 || '',
            day5: passedProgram.day5 || '',
            day6: passedProgram.day6 || '',
            hasProgram: true,

        })
    }


    static addPushToken(uid, token) {
        let path = "/user/" + uid + "/details";
        firebase.database().ref(path).update({
           token: token
        });
    }

    static addUserDetails(gender, DaysPerWeek, height, weight, name) {
         let uid = firebase.auth().currentUser.uid;
         let path = "/user/" + uid + "/details";
         let emptyDate = moment("1990-06-06").format('YYYY-MM-DD');
         firebase.database().ref().child('user').child(uid).set({
            ownProgram: {hasProgram: false, programName: ''},
            statistics: {
                exercisesDone: 0,
                exercisesDoneYesterday: 0,
                lastWorkoutDate: ''
            },
            workoutLogs: {"2000-01-01": ["null"]},
            exerciseLogs: '',
            details: {difficultyRate: 0, level: 0, programName: '', 
            gender: gender, 
            DaysPerWeek: DaysPerWeek,
            height: height,
            weight: weight,
            name: name
    }
        });        
    }

}

module.exports = Database;