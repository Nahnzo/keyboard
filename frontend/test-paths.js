import fsdPathChecker from 'fsd-path-checker'
const projectRoot = process.cwd()

;(async function () {
  const results = await fsdPathChecker.analyzeProject(projectRoot)

  if (results.length > 0) {
    console.error('Обнаружены ошибки в путях:')
    results.forEach(({ file, issue }) => {
      console.error(`Ошибка в файле ${file}: ${issue}`)
    })
  } else {
    console.log('Все пути в порядке!')
  }
})()
