import * as firebase from "firebase";
import moment from 'moment';
var _ = require('lodash');

class Database {

    static setUserTodo(userId, todo) {

        let userTodoPath = "/user/" + userId + "/details";

        return firebase.database().ref(userTodoPath).set({
            todo: todo
        })

    }

    static listenForExercises() {
        let ref = firebase.database().ref().child('exercises');
        let exercises = [];
        ref.on('value', (snap) => {
            // get children as an array
            //var exercises = [];
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
        let details = [];
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/details";
         firebase.database().ref(path).on('value', (snap) => {
            // get children as an array
            console.log(snap.val())
            details.push({
                height: snap.val().height,
                weight: snap.val().weight,
            });
            console.log(uid)
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
            let weekLogDates = Object.keys(logs).filter((date) => {
                return ( moment(date).format('W') === currentWeek )
            })
            // Total Weight Per Week
            let totalWeight = []
            weekLogDates.map((day) => {
                weekTotalExercises.push(logs[day].length)
                logs[day].map((exercises) => {
                    exercises.weight.map((weight) =>{
                        totalWeight.push(parseInt(weight))
                    })
                })
            })
            let weekTotalWeight = _.sum(totalWeight)
            weekTotalExercises = _.sum(weekTotalExercises)
            console.log(weekTotalExercises)
            let weekTotalWorkouts = weekLogDates.length
            weekLogDates.forEach((date) => {
                logsRec.push([
                    ...logs[date],
                    date,
                ]);
            })
          callback(logsRec, weekTotalWeight, weekTotalWorkouts, weekTotalExercises)
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
            Object.keys(logs).map((day) => {
                totalExercises.push(logs[day].length)
                logs[day].map((exercises) => {
                    exercises.weight.map((weight) =>{
                        totalWeight.push(parseInt(weight))
                    })
                })
            })
            totalExercises = _.sum(totalExercises)
            let totalWorkouts = Object.keys(logs).length
            totalWeight = _.sum(totalWeight)
          callback(logs, totalWeight, totalWorkouts, totalExercises)
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
    
    static saveExerciseSequence(exercises) {
            let uid = firebase.auth().currentUser.uid;
            let path = "/user/" + uid + "/ownProgram/exerciseSequence";
           
            firebase.database().ref(path).set({
                exercises,
                currentExerciseIndex: 0,
                currentWorkoutDay: 1
            })
    }
    
    static getOwnExercises(callback) {
            let uid = firebase.auth().currentUser.uid;
            let exercises = firebase.database().ref().child('user').child(uid).child('ownProgram').child('exerciseSequence').on('value', (snap) => {
                let exercises = snap.val().exercises;
                console.log('Snap.val().exercises is below');
                console.log(snap.val().exercises);
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
            console.log(program);
            callback(program);
    })
 
    }


static getUserProgramName(callback) {
        (async () => {
            let uid = await firebase.auth().currentUser.uid;
            console.log(uid);
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
        console.log('Triggered from database.js');
        firebase.database().ref(path).on('value', (snap) => {
            let index = snap.val().currentExerciseIndex;
            console.log('Index of exercise is ' + index);
            callback(index);
        })
    }
    static getCurrentWorkoutDay(callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/ownProgram/exerciseSequence/';
        firebase.database().ref(path).on('value', (snap) => {
            let day = snap.val().currentWorkoutDay;
            callback(day);
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
        let dayNumber;
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/statistics';
        firebase.database().ref(path).update({
            lastWorkoutDate: moment().format('MM-DD-YY')
        });
        this.getCurrentWorkoutDay((day) => {dayNumber = day})
        this.emptyWorkout(dayNumber);
        
    }
    static pushWorkoutLog(log){
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/workoutLogs/' + Date.now();
        let totalWeight = 0;
        log.forEach((logItem) => {
            totalWeight+=parseInt(logItem.weight)
        })
        firebase.database().ref(path).set({
            ...log
        })
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

    static emptyWorkout(dayNumber){
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/ownProgram/exerciseSequence';
        firebase.database().ref(path).update({
            currentExerciseIndex: 0,
            currentWorkoutDay: dayNumber + 1
        })
    }
    static addExerciseStats(name, weight, sets, reps, ownExercise) {
        let uid = firebase.auth().currentUser.uid;

        let path = "/user/" + uid + "/statistics";
        let path2 = "/user/" + uid + "/exercisesLogs/" + Date.now();
        firebase.database().ref(path2).set({
            name,
            weight,
            sets,
            reps,
            metric: "kg",
            date: moment().format()
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
    static listeningForCustomLogs(currentDate, callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/exercisesLogs";
        
        let currDate = currentDate;
        firebase.database().ref(path).on('value', (snap) => {
            let logs = snap.val();
            let CustomLogs = [];
            if (logs !== null) {
            Object.keys(logs).forEach((date) => {
                CustomLogs.push(logs[date])                
            })
            }
            callback(CustomLogs);
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
    static getId() {

        let checkAuthInterval = setInterval(function(){
        if ( typeof firebase.auth().currentUser.uid !== undefined ) {
            clearInterval(checkAuthInterval);
            return firebase.auth().currentUser.uid;
        }
        }, 500);

    }
    static addUserDetails(gender, DaysPerWeek, height, weight, name) {
         let uid = firebase.auth().currentUser.uid;
         let path = "/user/" + uid + "/details";
         firebase.database().ref().child('user').child(uid).set({
            ownProgram: {hasProgram: false, programName: ''},
            statistics: {
                exercisesDone: 0,
                exercisesDoneYesterday: 0,
                lastWorkoutDate: ''
            },
            workoutLogs: '',
            exercisesLogs: '',
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