export default function Footer() {
  return (
    <footer className="flex flex-col items-center max-w-screen bg-[#3d3d3d] font-regular text-[#73FFD7]">
      <div className="flex flex-row gap-10 pt-10 px-10">
        <div>
          <p>Elevorganisasjonen</p>
          <p>
            Telefon:{" "}
            <a href="tel:22993700" className="hover:underline text-[#f5f3ee]">
              22 99 37 00
            </a>
          </p>
          <p>
            E-post:{" "}
            <a
              href="mailto:elev@elev.no"
              className="hover:underline text-[#f5f3ee]"
            >
              elev@elev.no
            </a>
          </p>
        </div>

        <div className="max-w-2/5">
          <p>
            Ansvarlig redaktør:{" "}
            <a
              href="mailto:martine@elev.no"
              className="hover:underline text-[#f5f3ee]"
            >
              Martine Løkken Svendsen
            </a>
          </p>
          <p>
            Redaktører:{" "}
            <a
              href="mailto:hedda@elev.no"
              className="hover:underline text-[#f5f3ee]"
            >
              Hedda Bråten
            </a>
            ,{" "}
            <a
              href="mailto:august@elev.no"
              className="hover:underline text-[#f5f3ee]"
            >
              August Østby
            </a>{" "}
            og{" "}
            <a
              href="mailto:zaid@elev.no"
              className="hover:underline text-[#f5f3ee]"
            >
              Zaid Ahmmad
            </a>
          </p>
        </div>
        <div>
          <p>Post- og besøksaddresse:</p>
          <p>Christian Kroghs gate 1, 0186 Oslo</p>
          <p>981 070 151</p>
          <a
            href="https://elev.no/kontakt/"
            className="hover:underline text-[#f5f3ee]"
          >
            Mer kontaktinformasjon
          </a>
        </div>
      </div>
      <div className="text-center pt-5 pb-10">
        <p>
          Utviklet for Elevorganisasjonen av{" "}
          <a
            href="mailto:birk@bawm.no"
            className="hover:underline text-[#f5f3ee]"
          >
            Birk Monsen
          </a>{" "}
          og{" "}
          <a
            href="mailto:scott@elev.no"
            className="hover:underline text-[#f5f3ee]"
          >
            Scott Bloomberg
          </a>
        </p>
      </div>
    </footer>
  );
}
