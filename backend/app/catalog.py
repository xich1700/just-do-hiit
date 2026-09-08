from app.models import Session

CATALOG: list[Session] = [
    Session(
        id="tabata-4min",
        name="4-Minute Tabata",
        level="Intermediate",
        blocks=[
            {
                "exercise": "Squats",
                "instruction": "Lower your hips, keep your back straight, knees tracking over your toes",
                "work_seconds": 20,
                "rest_seconds": 10,
                "rounds": 8,
            },
        ],
    ),
    Session(
        id="express-circuit",
        name="Express Circuit",
        level="Beginner",
        blocks=[
            {
                "exercise": "Squats",
                "instruction": "Lower your hips, keep your back straight",
                "work_seconds": 30,
                "rest_seconds": 15,
                "rounds": 3,
            },
            {
                "exercise": "Push-ups",
                "instruction": "On your knees if needed, elbows close to your body",
                "work_seconds": 30,
                "rest_seconds": 15,
                "rounds": 3,
            },
            {
                "exercise": "Forward lunges",
                "instruction": "Alternate legs, back knee close to the ground",
                "work_seconds": 30,
                "rest_seconds": 15,
                "rounds": 3,
            },
            {
                "exercise": "Plank",
                "instruction": "Keep your body aligned, don't let your hips sag",
                "work_seconds": 30,
                "rest_seconds": 15,
                "rounds": 3,
            },
        ],
    ),
    Session(
        id="full-session-warmup",
        name="Full Session with Warm-up",
        level="Advanced",
        blocks=[
            {
                "exercise": "Dynamic warm-up",
                "instruction": "Joint rotations, high knees, butt kicks",
                "work_seconds": 180,
                "rest_seconds": 0,
                "rounds": 1,
            },
            {
                "exercise": "Burpees",
                "instruction": "Chest to the floor, explosive jump at the top",
                "work_seconds": 40,
                "rest_seconds": 20,
                "rounds": 4,
            },
            {
                "exercise": "Jump squats",
                "instruction": "Land softly, knees bent",
                "work_seconds": 40,
                "rest_seconds": 20,
                "rounds": 4,
            },
            {
                "exercise": "Mountain climbers",
                "instruction": "Keep your hips stable, steady pace",
                "work_seconds": 40,
                "rest_seconds": 20,
                "rounds": 4,
            },
            {
                "exercise": "Push-ups",
                "instruction": "Elbows close to your body, core braced",
                "work_seconds": 40,
                "rest_seconds": 20,
                "rounds": 4,
            },
            {
                "exercise": "Jump lunges",
                "instruction": "Switch legs with each jump",
                "work_seconds": 40,
                "rest_seconds": 20,
                "rounds": 4,
            },
            {
                "exercise": "Cool-down - stretching",
                "instruction": "Slow breathing, stretch the muscle groups you worked",
                "work_seconds": 180,
                "rest_seconds": 0,
                "rounds": 1,
            },
        ],
    ),
]
