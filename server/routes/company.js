const { Router } = require("express");
const router = Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
	try {
		const company = await pool.query("SELECT * FROM company");
		res.status(200).json(company.rows);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

router.post("/add", async (req, res) => {
	try {
		const { name } = req.body;
		const newCompany = await pool.query(
			"INSERT INTO company (name , is_deleted) VALUES ($1, $2) RETURNING *",
			[name, false]
		);
		res.status(201).json(newCompany.rows[0]);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		await pool.query(`DELETE FROM technology WHERE company_id = $1`, [
			req.params.id,
		]);

		await pool.query(`DELETE FROM company WHERE id = $1`, [req.params.id]);

		res.status(200).json({ message: "Company deleted" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
