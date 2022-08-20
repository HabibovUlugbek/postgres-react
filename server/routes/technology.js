const { Router } = require("express");
const router = Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
	try {
		const technologies = await pool.query(`SELECT * FROM technology`);

		res.status(200).json(technologies.rows);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		console.log(id);
		const technology = await pool.query(
			`SELECT technology.type, technology.name, technology.price, company.name company FROM technology 
            LEFT JOIN company ON technology.company_id = company.id 
            WHERE technology.id = $1 `,
			[id]
		);
		console.log(technology.rows);

		res.status(200).json(technology.rows[0]);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

router.post("/add", async (req, res) => {
	try {
		const { type, name, made_date, model, price, company_id } = req.body;
		const newtechnology = await pool.query(
			"INSERT INTO technology (type, name, made_date,model, price, company_id, is_deleted) VALUES ($1,$2,$3,$4,$5,$6 ,$7) RETURNING *",
			[type, name, made_date, model, price, company_id, false]
		);
		res.status(201).json(newtechnology.rows[0]);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { type, name, made_date, model, price, company_id } = req.body;

		const oldTechnology = await pool.query(
			`SELECT * FROM technology WHERE id=$1`,
			[id]
		);

		const updatedTechnology = await pool.query(
			"UPDATE technology SET type=$1, name=$2, made_date=$3, model=$4, price=$5, company_id=$6 , is_deleted=$7 WHERE id = $8  RETURNING *",
			[
				type ? type : oldTechnology.rows[0].type,
				name ? name : oldTechnology.rows[0].name,
				made_date ? made_date : oldTechnology.rows[0].made_date,
				model ? model : oldTechnology.rows[0].model,
				price ? price : oldTechnology.rows[0].price,
				company_id ? company_id : oldTechnology.rows[0].company_id,
				false,
				id,
			]
		);
		res.status(201).json(updatedTechnology.rows[0]);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		// const technology = await pool.query(
		// 	`SELECT * FROM technology WHERE id=$1`,
		// 	[id]
		// );

		// const updatedtechnology = await pool.query(
		// 	"UPDATE technology SET type=$1, name=$2, made_date=$3, model=$4, price=$5, company_id=$6 , is_deleted=$7 WHERE id = $8  RETURNING *",
		// 	[
		// 		technology.rows[0].type,
		// 		technology.rows[0].name,
		// 		technology.rows[0].made_date,
		// 		technology.rows[0].model,
		// 		technology.rows[0].price,
		// 		technology.rows[0].company_id,
		// 		true,
		// 		id,
		// 	]
		// );
		await pool.query("DELETE FROM technology WHERE id = $1", [id]);
		res.status(200).json({ message: "technology deleted" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
