export function buildPhases(session) {
  const phases = []
  session.blocks.forEach((block, blockIndex) => {
    for (let round = 1; round <= block.rounds; round++) {
      phases.push({
        type: 'work',
        exercise: block.exercise,
        instruction: block.instruction,
        duration: block.work_seconds,
        blockIndex,
        round,
        roundsInBlock: block.rounds,
      })
      if (block.rest_seconds > 0) {
        phases.push({
          type: 'rest',
          exercise: block.exercise,
          instruction: block.instruction,
          duration: block.rest_seconds,
          blockIndex,
          round,
          roundsInBlock: block.rounds,
        })
      }
    }
  })
  return phases
}
