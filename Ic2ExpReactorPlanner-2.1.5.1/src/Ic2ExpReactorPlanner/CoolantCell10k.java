package Ic2ExpReactorPlanner;

/**
 * Represents a 10k Coolant Cell.
 * @author Brian McCloud
 */
public class CoolantCell10k extends ReactorComponent {
    
    /**
     * The filename for the image to show for the component.
     */
    private static final String imageFilename = "reactorCoolantSimple.png";     //NOI18N
    
    public static final MaterialsList MATERIALS = new MaterialsList(5, java.util.ResourceBundle.getBundle("Ic2ExpReactorPlanner/Bundle").getString("TIN"), java.util.ResourceBundle.getBundle("Ic2ExpReactorPlanner/Bundle").getString("DISTILLED WATER"), java.util.ResourceBundle.getBundle("Ic2ExpReactorPlanner/Bundle").getString("LAPIS LAZULI"));
    
    /**
     * Creates a new instance.
     */
    public CoolantCell10k() {
        setImage(TextureFactory.getImage(imageFilename));
        setMaxHeat(10000);
    }
    
    /**
     * Gets the name of the component.
     * @return the name of this component.
     */
    @Override
    public String toString() {
        String result = java.util.ResourceBundle.getBundle("Ic2ExpReactorPlanner/Bundle").getString("10K COOLANT CELL");
        if (getInitialHeat() > 0) {
            result += String.format(java.util.ResourceBundle.getBundle("Ic2ExpReactorPlanner/Bundle").getString("INITIAL_HEAT_DISPLAY"), (int)getInitialHeat());
        }
        return result;
    }

    @Override
    public boolean isHeatAcceptor() {
        return !isBroken();
    }
    
    @Override
    public MaterialsList getMaterials() {
        return MATERIALS;
    }

    @Override
    public double adjustCurrentHeat(double heat) {
        currentCellCooling += heat;
        bestCellCooling = Math.max(currentCellCooling, bestCellCooling);
        return super.adjustCurrentHeat(heat);
    }
    
}
