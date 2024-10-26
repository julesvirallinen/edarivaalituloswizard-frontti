const fs = require('fs')
const path = require('path')

const createCandidateJson = () => {
  const fileList = getFiles('rawData')
  var candidateList = {}
  fileList.forEach((file) => {
    let rawdata = fs.readFileSync(file)
    let data = JSON.parse(rawdata)
    const year = data.year
    data.children.forEach((coalition) => {
      const coalitionName = coalition.name
      coalition.children.forEach((group) => {
        const groupName = group.name
        group.children.forEach((candidate) => {
          candidateObject = {
            votes: candidate.value,
            elected: candidate.seats,
            co_prop: 2668,
            al_prop: 1461,
            coalition: coalitionName,
            group: groupName,
            year: year,
          }
          var name = candidate.name.replace(/\s/g, '')
          if (name.includes("'")) {
            const nickname = name.split("'")[1].split("'")[0]
            name = name.split("'")[0]
            candidateObject['nickname'] = nickname
          }

          const nameParts = name.split(',')
          name = `${nameParts[1]} ${nameParts[0]}`

          if (candidateList[name] === undefined) {
            candidateList[name] = {
              totalVotes: 0,
              times: 0,
              years: [],
              name: name,
            }
          }

          candidateList[name]['years'].push(candidateObject)
          candidateList[name]['totalVotes'] += candidateObject['votes']
          candidateList[name]['times'] += 1
        })
      })
    })
  })
  fs.writeFile(
    'data/byCandidate.json',
    JSON.stringify(candidateList),
    (err) => {
      if (err) {
        console.error(err)
        return
      }
      console.log('File has been created')
    }
  )
}

const createListList = () => {
  const fileList = getFiles('rawData')
  var dataObject = {}
  fileList.forEach((file) => {
    const name = file.split('/')[1].split('.')[0]
    let rawdata = fs.readFileSync(file)
    let data = JSON.parse(rawdata)

    dataObject[name] = data
  })

  fs.writeFile('./yearlyData.json', JSON.stringify(dataObject), (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('File has been created')
  })
}

function getFiles(dir, files_) {
  files_ = files_ || []
  var files = fs.readdirSync(dir)
  for (var i in files) {
    var name = dir + '/' + files[i]
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_)
    } else {
      files_.push(name)
    }
  }
  return files_
}

createCandidateJson()
